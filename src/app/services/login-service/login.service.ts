import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  getAuth,
  authState,
  sendPasswordResetEmail,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { User } from 'src/app/modules/user.class';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public currentUser: User;
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {}

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => {
        this.setCurrentUser(user);
        return from(this.updateUserInFirestore(user.uid, { isOnline: true }));
      })
    );
  }

  signUp(
    name: string,
    email: string,
    password: string,
    avatarUrl: string = './assets/img/avatar/avatar0.png'
  ) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => {
        const usersRef = collection(this.firestore, 'users');
        return from(
          addDoc(usersRef, {
            uid: user.uid,
            name: name,
            email: email,
            avatarUrl: avatarUrl,
          })
        ).pipe(
          switchMap(() =>
            updateProfile(user, { displayName: name, photoURL: avatarUrl })
          )
        );
      })
    );
  }

  setCurrentUser(user: any) {
    this.currentUser = new User({
      uid: user.uid,
      name: user.displayName || '',
      email: user.email,
      avatarUrl: user.photoURL || '',
      isOnline: true,
    });
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  logout() {
    if (this.currentUser) {
      this.updateUserInFirestore(this.currentUser.uid, {
        isOnline: false,
      }).then(() => {
        return from(this.auth.signOut());
      });
    }
  }

  googleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        this.router.navigate(['main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  updateUserProfile(data: {
    displayName?: string;
    photoURL?: any;
  }): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, data);
    } else {
      return Promise.reject(new Error('Benutzer nicht gefunden'));
    }
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    const resetLink = `https://dschabrail-isaev.developerakademie.net/dabubble?email=${email}`;

    return sendPasswordResetEmail(this.auth, email, {
      url: resetLink,
      handleCodeInApp: true,
    });
  }

  async updateUserInFirestore(
    uid: string,
    data: { isOnline?: boolean; avatarUrl?: string }
  ): Promise<void> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, data);
    } else {
      console.error('Benutzerdokument nicht gefunden:', uid);
      throw new Error('Benutzerdokument nicht gefunden');
    }
  }
}
