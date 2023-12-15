import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, getDocs, query } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { ChannelService } from './channel.service';
import { LoginService } from './login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();
  choosenMessageId;
  messages: any[] = [];

  constructor(
    private firestore: Firestore,
    public channelService: ChannelService,
    public loginService: LoginService
  ) { }

  async setSelectedUser(user: any) {
    this.selectedUserSource.next(user);
    const channelId = this.channelService.selectedChannel.id;
    const threadDocRef = doc(this.firestore, `channels/${channelId}/groupchat/${this.choosenMessageId}`);
    const messagesCollectionRef = collection(threadDocRef, 'thread');
    const messagesQuery = query(messagesCollectionRef);
    const querySnapshot = await getDocs(messagesQuery);
    this.messages = querySnapshot.docs.map(doc => doc.data());
    this.sortMessagesByTime();
  }

  async sendMessage(message: string): Promise<void> {
    const channelId = this.channelService.selectedChannel.id;
    const threadRef = collection(this.firestore, `channels/${channelId}/groupchat/${this.choosenMessageId}/thread`);
    const currentTimestamp = Timestamp.now().toDate();
    const newMessage = {
      senderId: this.loginService.currentUser.uid,
      text: message,
      sentDate: currentTimestamp.toLocaleDateString(),
      sentTime: `${currentTimestamp.getHours()}:${currentTimestamp.getMinutes()}`,
      send: Timestamp.now(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
      // mediaUrl: downloadURL,
      // fileName: file.name,
    };
    await addDoc(threadRef, newMessage);
    this.messages.push(newMessage);
    this.sortMessagesByTime();
  }

  private sortMessagesByTime() {
    this.messages.sort((a, b) => {
      const timeA = a.send.seconds;
      const timeB = b.send.seconds;
      return timeA - timeB;
    });
  }
}
