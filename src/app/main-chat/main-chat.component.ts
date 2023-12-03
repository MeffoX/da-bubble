import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { Firestore, addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MainChatComponent implements OnInit {
  private unsubscribeMessages: () => void;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  channelUsers$: Observable<any[]>;
  messageText: any = '';
  messages: any[] = [];
  emojiPicker: boolean = false;
  emojiPickerReaction: boolean = false;
  currentMessageId;

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public loginService: LoginService,
    public firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getMessagesForSelectedChannel();
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('channelId');
      if (channelId) {
        this.channelService.selectedChannel = this.getMessagesForSelectedChannel();
      }
    });
  }

  get selectedChannel() {
    return this.channelService.selectedChannel;
  }

  getUserAvatar(user: any): string {
    return user.avatarUrl;
  }

  openUserListDialog() {
    this.dialog.open(UserListComponent);
  }

  openAddUserDialog() {
    this.dialog.open(AddUserComponent);
  }

  openChannelDialog(channel: any) {
    channel = this.channelService.selectedChannel;
    this.dialog.open(ChannelComponent);
  }

  sendMessage() {
    const channelUserIds = this.selectedChannel.channelUser.map(user => user.uid);
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedTime = this.formatTime(currentDate);

    this.sendMessageToGroupChat(this.channelService.selectedChannel.id, {
      text: this.messageText,
      senderId: this.loginService.currentUser.uid,
      receiverId: channelUserIds,
      sentDate: formattedDate,
      sentTime: formattedTime,
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
      reaction: null,
    }).then(() => {
      this.messageText = '';
    });
  }

  async sendMessageToGroupChat(channelId: string, message: any): Promise<void> {
    const groupChatRef = collection(this.firestore, `channels/${channelId}/groupchat`);
    const docRef = await addDoc(groupChatRef, message);
    const newMessageId = docRef.id;
    console.log(newMessageId);
    // Hier ist die Dokumenten-ID der hinzugefügten Nachricht
    this.scrollToBottom();
  }


  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  formatMessageTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }


  getMessagesForSelectedChannel() {
    const channelId = this.selectedChannel.id;
    const groupChatRef = collection(this.firestore, `channels/${channelId}/groupchat`);
    const orderedQuery = query(groupChatRef, orderBy('sentDate', 'asc'), orderBy('sentTime', 'asc'));
    this.unsubscribeMessages = onSnapshot(orderedQuery, (querySnapshot) => {
      this.messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
    });
  }

  toggleEmojiPickerReaction(messageId: string) {
    this.emojiPickerReaction = !this.emojiPickerReaction;
    this.updateCurrentMessageId(messageId);
  }

  updateCurrentMessageId(messageId: string) {
    this.currentMessageId = messageId;
  }


  toggleEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  addEmoji($event) {
    this.messageText += $event.emoji.native;
    this.emojiPicker = false;
  }

  async addReaction($event) {
    let emoji = $event.emoji.native;
    if (this.currentMessageId) {
      const channelId = this.selectedChannel.id;
      const ref = collection(this.firestore, `channels/${channelId}/groupchat`);
      const docSnapshot = await getDoc(doc(ref, this.currentMessageId));
      if (docSnapshot.exists()) {
        const currentReactions = docSnapshot.data().reaction || [];
        currentReactions.push(emoji);
        await updateDoc(doc(ref, this.currentMessageId), { reaction: currentReactions });
      }
    }
    this.emojiPickerReaction = false;
  }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
    }
  }
}