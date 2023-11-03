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
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

currentUser$ = authState(this.auth);

  constructor(private auth: Auth, private router: Router,) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  logout() {
    return from(this.auth.signOut());
  }

  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

  googleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider(); // Define GoogleAuthProvider
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        const user = result.user; // The signed-in user info.
        // Additional actions after successful login
        this.router.navigate(['main']);
      })
      .catch((error) => {
        // Handle errors during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        // Additional error handling
      });
  }

  updateUserProfile(data: { displayName?: string, photoURL?: any }): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, data);
    } else {
      return Promise.reject(new Error('Benutzer nicht gefunden'));
    }
  }
}
