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
  }

  async sendMessage(message: string): Promise<void> {
    const channelId = this.channelService.selectedChannel.id;    
    const threadRef = doc(this.firestore, `channels/${channelId}/groupchat/${this.choosenMessageId}`);
    const newMessage = {
      text: message,
      senderId: this.loginService.currentUser.uid,
      sentDate: Timestamp.now(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name
    };
    await addDoc(collection(threadRef, 'thread'), newMessage);
    this.messages.push(newMessage);
  }
}
