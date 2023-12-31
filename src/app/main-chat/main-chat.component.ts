import { AfterViewChecked, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { GlobalVariablService } from '../services/global-variabl.service';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { NavigationEnd, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';
import { UploadService } from '../services/upload.service';


@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MainChatComponent implements OnInit, AfterViewChecked {
  private unsubscribeMessages: () => void;
  @ViewChild('fileInput') fileInput: ElementRef;
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
    public userService: UserService,
    public globalVariable: GlobalVariablService,
    public threadService: ThreadService,
    private uploadService: UploadService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getMessagesForSelectedChannel();
      }
    });
  }

  ngOnInit() {
    this.getMessagesForSelectedChannel();
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
      send: Timestamp.now(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
      reaction: null,
      messageId: '',
      threadMessages: 0
    }).then(async () => {
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
    const orderedQuery = query(groupChatRef, orderBy('send', 'asc'));
    this.unsubscribeMessages = onSnapshot(orderedQuery, (querySnapshot) => {
      this.messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      this.sortMessagesByTime();
    });
  }

  private sortMessagesByTime() {
    this.messages.sort((a, b) => {
      const timeA = a.sentDate + ' ' + a.sentTime;
      const timeB = b.sentDate + ' ' + b.sentTime;
      return new Date(timeA).getTime() - new Date(timeB).getTime();
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

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    if (fileToUpload) {
      if (!this.uploadService.checkFileSize(fileToUpload)) {
        window.alert('Datei ist zu groß. Maximale Dateigröße ist 2 MB.');
        return;
      }

      this.uploadService.uploadFile(fileToUpload).then(downloadURL => {
        this.sendMediaMessage(fileToUpload, downloadURL);
      }).catch(error => {
        console.error("Fehler beim Hochladen: ", error);
      });
    }
  }

  sendMediaMessage(file: File, downloadURL: string) {
    const channelUserIds = this.selectedChannel.channelUser.map(user => user);
    const currentDate = new Date();
    const formattedDate = this.formatDate(currentDate);
    const formattedTime = this.formatTime(currentDate);
    const message = {
      text: this.messageText,
      senderId: this.loginService.currentUser.uid,
      receiverId: channelUserIds,
      sentDate: formattedDate,
      sentTime: formattedTime,
      send: Timestamp.now(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
      reaction: null,
      messageId: '',
      mediaUrl: downloadURL,
      fileName: file.name,
      threadMessages: 0
    };
    this.sendMessageToGroupChat(this.channelService.selectedChannel.id, message).then(() => {
      this.messageText = '';
    });
  }

  ngOnDestroy() {
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
}