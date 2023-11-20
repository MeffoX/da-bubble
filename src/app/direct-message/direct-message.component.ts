import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent {
  user = this.loginService.currentUser;
  selectedUser = this.userService.selectedUser;
  messages$; // Änderung: Observable für Nachrichten hinzugefügt
  messageText: string = '';

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private dialog: MatDialog,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.messages$ = this.loginService.currentUser$.pipe(
      switchMap((user) => {
        return this.getMessages(user.uid, this.userService.selectedUser.uid);
      })
    );
    console.log(this.messages$);
  }

  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }

  async sendMessage() {
    const senderId = this.loginService.currentUser.uid;
    const receiverId = this.userService.selectedUser.uid;
    console.log(this.loginService.currentUser);
    try {
      const docRef = await addDoc(collection(this.firestore, 'dm'), {
        userIds: [senderId, receiverId],
        text: this.messageText,
        senderId: senderId,
        receiverId: receiverId,
        sentDate: new Date(),
        avatarUrl: this.loginService.currentUser.avatarUrl,
        name: this.loginService.currentUser.name,
      });
      console.log('Document written with ID: ', (await docRef).id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    this.messageText = '';
  }

  getMessages(senderId: string, receiverId: string): Observable<any[]> {
    const q = query(
      collection(this.firestore, 'dm'),
      where('userIds', '==', [senderId, receiverId]),
      orderBy('sentDate', 'asc')
    );

    return new Observable<any[]>((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data());
          });
          observer.next(messages);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
