import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { User } from '@angular/fire/auth';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { DirectMessage } from '../modules/direct-message.class';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent {
  user;
  selectedUser = this.userService.selectedUser;
  messages$; // Änderung: Observable für Nachrichten hinzugefügt
  messageText: string = '';

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private dialog: MatDialog,
    private firestore: Firestore
  ) { }

  /*
  ngOnInit() {
    // Verwende switchMap, um zwischen user$ und messages$ zu schalten
    this.user$ = this.loginService.currentUser$.pipe(
      switchMap((user) => {
        // Hole die Nachrichten für den eingeloggten Benutzer und den ausgewählten Benutzer
        return this.getMessages(user.uid, this.userService.selectedUser.uid);
      })
    );

    // Initialisiere die Observable für Nachrichten
    this.messages$ = this.user$.pipe(
      switchMap((user) => {
        // Hole die Nachrichten für den eingeloggten Benutzer und den ausgewählten Benutzer
        return this.getMessages(user.uid, this.userService.selectedUser.uid);
      })
    );
  }
*/
  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }

  openProfilInfo() { }

  async sendMessage() {
    const senderId = this.loginService.currentUser.uid;
    const receiverId = this.userService.selectedUser.uid;
    try {
      const docRef = await addDoc(collection(this.firestore, 'dm'), {
        userIds: [senderId, receiverId],
        text: this.messageText,
        senderId: senderId,
        receiverId: receiverId,
        sentDate: new Date(),
      });
      console.log('Document written with ID: ', (await docRef).id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    this.messageText = '';
  }
  /*
  getMessages(senderId: string, receiverId: string) {
    return this.firestore
      .collection('dm', (ref) =>
        ref
          .where('userIds', 'array-contains', senderId)
          .where('userIds', 'array-contains', receiverId)
          .orderBy('sentDate', 'asc')
      )
      .valueChanges();
  }

  ngOnDestroy(){

  };
*/

  getUser(): void {
    this.loginService.currentUser$.subscribe((user) => {
      this.user = user;
      this.loginService.setCurrentUser(this.user);
    });
  }
}
