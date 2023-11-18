import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Observable, switchMap } from 'rxjs';
import { DirectMessage } from '../modules/direct-message.class';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent {
  user$ = this.loginService.currentUser$;
  selectedUser = this.userService.selectedUser;
  messages$; // Änderung: Observable für Nachrichten hinzugefügt
  messageText: string = '';

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private firestore: Firestore
  ) {}

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
  openProfilInfo() {}

 async sendMessage() {
    const senderId = this.loginService.currentUser.uid;
    const receiverId = this.userService.selectedUser.uid;
    try {
      const docRef = await addDoc(collection(this.firestore, "dm"), {
        userIds: [senderId, receiverId],
        users: [this.loginService.currentUser, this.userService.selectedUser],
        text: this.messageText,
        senderId: senderId,
        sentDate: new Date(),
      });
      console.log("Document written with ID: ", (await docRef).id);
    } catch (e) {
      console.error("Error adding document: ", e);
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
}
