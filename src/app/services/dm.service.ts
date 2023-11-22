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
  allMessages = [];
  messages = [];

  constructor(
    private firestore: Firestore,
    public userService: UserService,
    public loginService: LoginService
  ) {
    this.subMessages();
  }

  getRef() {
    return collection(this.firestore, 'dm');
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
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  subMessages() {
    this.unsubMessages = onSnapshot(
      query(this.getRef(), where('userIds', 'array-contains', this.senderId)),
      (list) => {
        this.allMessages = list.docs.map((doc) =>
          this.setMessageObject(doc.data())
        );
        this.filterMessages();
        console.log(this.messages);
      }
    );
  }

  /**
   * Converts Firestore Timestamp to a readable object and formats date and time.
   * @param {any} obj - The object to be converted and formatted.
   * @returns {any} The converted and formatted object.
   */
  setMessageObject(obj: any) {
    const formattedSentDate = this.formatDate(obj.sentDate.toDate());
    const formattedSentTime = this.formatTime(obj.sentDate.toDate());

    return {
      userIds: [obj.senderId, obj.receiverId],
      text: obj.text,
      senderId: obj.senderId,
      receiverId: obj.receiverId,
      sentDate: formattedSentDate,
      sentTime: formattedSentTime,
      avatarUrl: obj.avatarUrl,
      name: obj.name,
    };
  }

  /**
   * Formats the date in the desired format.
   * @param {Date} date - The date to be formatted.
   * @returns {string} The formatted date.
   */
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  /**
   * Formats the time in the desired format.
   * @param {Date} date - The date whose time needs to be formatted.
   * @returns {string} The formatted time.
   */
  formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  filterMessages() {
    setInterval(() => {
      this.messages = this.allMessages.filter(
        (message) =>
          message.userIds.includes(this.userService.selectedUser.uid) &&
          message.userIds.includes(this.loginService.currentUser.uid)
      );
    }, 100);
  }

  ngOnDestroy() {
    this.unsubMessages();
  }
}
