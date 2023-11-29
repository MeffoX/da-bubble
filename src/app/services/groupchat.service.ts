import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { LoginService } from './login-service/login.service';
import { ChannelService } from './channel.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupchatService {
  unsubMessages;
  unsubSelectedUser;
  allMessages = [];
  messages = [];
  private channelUserIds: string[];

  constructor(
    private firestore: Firestore,
    public loginService: LoginService,
    public channelService: ChannelService,
    public userService: UserService
  ) {
    this.subMessages();
    this.subscribeToSelectedUserChanges();
  }

  private getRef() {
    return collection(this.firestore, 'groupchats');
  }

  async sendMessage(messageText) {
    const channelUserIds = this.channelService.selectedChannel.channelUser.map(user => user.uid);
    const groupId = this.getGroupId(channelUserIds); // Neue Funktion für die Gruppen-ID
    const existingMessage = await this.findExistingMessage(groupId);

    if (existingMessage) {
      await this.updateExistingMessage(existingMessage.id, {
        text: messageText,
        sentDate: new Date(),
      });
    } else {
      await this.addNewMessage({
        text: messageText,
        senderId: this.loginService.currentUser.uid,
        receiverId: channelUserIds,
        sentDate: new Date(),
        avatarUrl: this.loginService.currentUser.avatarUrl,
        name: this.loginService.currentUser.name,
        groupId: groupId, // Hinzufügen der Gruppen-ID
      });
    }
  }

  private getGroupId(channelUserIds) {
    // Hier könntest du eine eindeutige Gruppen-ID erstellen, z.B., indem du die IDs der Benutzer kombinierst.
    // Alternativ könntest du eine zufällige ID generieren.
    return channelUserIds.sort().join('_');
  }

  private async findExistingMessage(groupId) {
    const querySnapshot = await getDocs(query(
      this.getRef(),
      where('groupId', '==', groupId),
      where('senderId', '==', this.loginService.currentUser.uid),
    ));

    const documents = querySnapshot.docs;

    return documents.length > 0 ? { id: documents[0].id, data: documents[0].data() } : null;
  }


  private async updateExistingMessage(messageId, data) {
    await updateDoc(doc(this.getRef(), messageId), data);
  }

  private async addNewMessage(data) {
    const docRef = await addDoc(this.getRef(), data);
    const messageId = docRef.id;
    await updateDoc(docRef, { messageId });
  }


  /**
 * Subscribes to changes in the Firestore messages collection.
 * @returns {void}
 */
  subMessages() {
    this.unsubMessages = onSnapshot(
      this.getMessagesQuery(),
      (list) => {
        this.allMessages = list.docs.map((doc) =>
          this.setMessageObject(doc.data())
        );
        this.filterMessages();
      }
    );
  }

  getMessagesQuery() {
    const channelUserIds = this.channelService.selectedChannel.channelUser.map(user => user.uid);
    return query(
      this.getRef(),
      where('receiverId', 'array-contains', channelUserIds),
      where('senderId', '==', this.loginService.currentUser.uid),
      orderBy('sentDate', 'asc')
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
      text: obj.text,
      senderId: obj.senderId,
      receiverId: obj.receiverId,
      sentDate: formattedSentDate,
      sentTime: formattedSentTime,
      avatarUrl: obj.avatarUrl,
      name: obj.name,
      messageId: obj.messageId,
      groupId: obj.groupId
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
    const currentUserUid = this.loginService.currentUser?.uid;

    if (currentUserUid) {
      const channelUserIds = this.channelService.selectedChannel.channelUser.map(user => user.uid);

      this.messages = this.allMessages.filter(
        (message) =>
          (message.senderId === currentUserUid && channelUserIds.includes(message.receiverId)) ||
          (message.receiverId === message.senderId && channelUserIds.includes(message.senderId))
      );
    } else {
      this.messages = [];
    }
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
