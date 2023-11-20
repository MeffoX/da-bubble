import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from '@angular/fire/firestore';

import { UserService } from './user.service';
import { LoginService } from './login-service/login.service';

@Injectable({
  providedIn: 'root',
})
export class DmService {
  senderId = this.loginService.currentUser.uid;
  receiverId = this.userService.selectedUser.uid;
  unsubMessages;
  messages = [];

  constructor(
    private firestore: Firestore,
    public userService: UserService,
    public loginService: LoginService
  ) {
     this.subMessages();
  }

  async sendMessage(messageText) {
    try {
      const docRef = await addDoc(this.getRef(), {
        userIds: [this.senderId, this.receiverId],
        text: messageText,
        senderId: this.senderId,
        receiverId: this.receiverId,
        sentDate: new Date(),
        avatarUrl: this.loginService.currentUser.avatarUrl,
        name: this.loginService.currentUser.name,
      });
      console.log('Document written with ID: ', (await docRef).id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  subMessages() {
    debugger;
    this.unsubMessages = onSnapshot(
      query(this.getRef(), where('userIds', 'array-contains', this.senderId)),
      (list) => {
        this.messages = [];
        list.forEach((element) => {
          let messageData = element.data();
          this.messages.push(this.setMessageObject(messageData));
        });
      }
    );
  }

  setMessageObject(obj: any) {
    return {
      userIds: [obj.senderId, obj.receiverId],
      text: obj.text,
      senderId: obj.senderId,
      receiverId: obj.receiverId,
      sentDate: obj.sentDate,
      avatarUrl: obj.avatarUrl,
      name: obj.name,
    };
  }

  getRef() {
    return collection(this.firestore, 'dm');
  }

  ngOnDestroy() {
    this.unsubMessages();
  }
}
