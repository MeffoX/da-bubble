import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { GlobalVariablService } from '../services/global-variabl.service';
import { Firestore, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';


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
  selectedUser;
  choosenMessageId;
  threadData;
  threadId;

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public loginService: LoginService,
    public firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService,
    public globalVariable: GlobalVariablService,
    public threadService: ThreadService
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
    const channelUserIds = this.selectedChannel.channelUser.map(user => user);
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
      messageId: this.choosenMessageId,
    }).then(() => {
      this.messageText = '';
    });
  }

  async sendMessageToGroupChat(channelId: string, message: any): Promise<void> {
    const groupChatRef = collection(this.firestore, `channels/${channelId}/groupchat`);
    await addDoc(groupChatRef, message);
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

  startThread(messageId) {
    this.choosenMessageId = messageId;
    this.threadService.choosenMessageId = messageId;
    const channelId = this.selectedChannel.id;
    const threadRef = doc(this.firestore, `channels/${channelId}/groupchat/${this.choosenMessageId}`);
    getDoc(threadRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        this.threadData = docSnapshot.data();
        this.openThread(this.threadData);
      }
    });
  }

  openThread(user) {
    this.selectedUser = user;
    if (this.selectedUser) {
      this.globalVariable.openChannelChat = true;
      this.globalVariable.openThread = true;
      this.globalVariable.openDM = false;
      this.globalVariable.openNewMessage = false;
      this.threadService.setSelectedUser(this.selectedUser);
    }
  }  

  ngOnDestroy() {
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
    }
  }
}