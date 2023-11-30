import { Component, Injectable, OnInit } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';

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
  messageText: any = '';
  messages: any[] = [];

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public loginService: LoginService,
    public firestore: Firestore
  ) { }

  ngOnInit() { }

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
    })
  }

  async getMessagesForSelectedChannel() {
    const channelId = this.selectedChannel.id;
    const groupChatRef = collection(this.firestore, `channels/${channelId}/groupchat`);
  
    onSnapshot(groupChatRef, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => doc.data());
      this.messages = messages;
      console.log(this.messages);
    });
  }
}