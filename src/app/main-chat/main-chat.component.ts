import { Component, Injectable, OnInit } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable, Subject } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class MainChatComponent implements OnInit {
  channelUsers$: Observable<any[]>;
  channels: any[] = [];
  messageText: any = '';
  messages;
  channelId;

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public loginService: LoginService,
    public firestore: Firestore
  ) { }

  ngOnInit() {
    this.messages = this.getMessagesForSelectedChannel();
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
    this.channelService.sendMessageToGroupChat(this.channelService.selectedChannel.id, {
      text: this.messageText,
      senderId: this.loginService.currentUser.uid,
      receiverId: channelUserIds,
      sentDate: new Date(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
    }).then(() => {
      this.messageText = '';
    }).catch((error) => {
      console.error('Error sending message:', error);
    });
  }

  async getMessagesForSelectedChannel() {
    const channelId = this.channelService.selectedChannel.id;
    const groupChatRef = await getDocs(collection(this.firestore, `channels/${channelId}/groupchat`));
    const messages = groupChatRef.docs.map(doc => doc.data());
    console.log(messages);
    this.channelId = channelId;
    this.messages = messages;
  }
}