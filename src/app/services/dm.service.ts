import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
  unsubSelectedUser;
  allMessages = [];
  messages = [];

  constructor(
    private firestore: Firestore,
    public userService: UserService,
    public loginService: LoginService
  ) {
    this.subMessages();
    this.subscribeToSelectedUserChanges();
  }

  getRef() {
    return collection(this.firestore, 'dm');
  }

  /**
 * Sends a message to the Firestore database.
 * @param {string} messageText - The text of the message to be sent.
 * @returns {Promise<void>} A promise that resolves when the message is successfully sent.
 * @throws Will throw an error if there is an issue adding the document to Firestore.
 */
  async sendMessage(messageText) {
    try {
      const docRef = await addDoc(this.getRef(), {
        userIds: [this.senderId, this.receiverId],
        text: messageText,
        senderId: this.senderId,
        receiverId: this.userService.selectedUser.uid,
        sentDate: new Date(),
        avatarUrl: this.loginService.currentUser.avatarUrl,
        name: this.loginService.currentUser.name,
        reaction: null,
        messageId: '',
      });
      const messageId = docRef.id;
      await updateDoc(doc(this.getRef(), docRef.id), { messageId });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  /**
 * Subscribes to changes in the Firestore messages collection.
 * @returns {void}
 */
  subMessages() {
    this.unsubMessages = onSnapshot(
      query(
        this.getRef(),
        where('userIds', 'array-contains', this.senderId),
        orderBy('sentDate', 'asc')
      ),
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
      reaction: obj.reaction,
      messageId: obj.messageId,
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

  /**
 * Subscribes to changes in the selected user and updates the messages accordingly.
 * @returns {void}
 */
  subscribeToSelectedUserChanges() {
    this.unsubSelectedUser = this.userService.selectedUser$.subscribe(() => {
      this.filterMessages();
    });
  }

  /**
 * Filters the messages based on the selected user.
 * @returns {void}
 */
  filterMessages() {
    this.messages = this.allMessages.filter(
      (message) =>
        (message.senderId == this.loginService.currentUser.uid &&
          message.receiverId == this.userService.selectedUser.uid) ||
        (message.senderId == this.userService.selectedUser.uid &&
          message.receiverId == this.loginService.currentUser.uid)
    );
  }

  /**
 * Updates the reaction for a specific message in Firestore.
 * @param {string} messageId - The ID of the message to be updated.
 * @param {string} reaction - The new reaction value.
 * @returns {Promise<void>} A promise that resolves when the reaction is successfully updated.
 */
  async updateReaction(messageId, reaction) {
    await updateDoc(doc(this.getRef(), messageId), { reaction });
  }

  ngOnDestroy() {
    this.unsubMessages();
    this.unsubSelectedUser();
  }
}
