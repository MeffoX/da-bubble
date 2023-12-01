import { Component, Injectable, OnInit } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service/login.service';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
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

  channelUsers$: Observable<any[]>;
  messageText: any = '';
  messages: any[] = [];

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public loginService: LoginService,
    public firestore: Firestore,
    private router: Router,
    private route: ActivatedRoute
  ) {   this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.getMessagesForSelectedChannel();
    }
  }); }

  ngOnInit() { 
    this.route.paramMap.subscribe(paramMap => {
      const channelId = paramMap.get('channelId');
      if (channelId) {
        this.channelService.selectedChannel = // Setzen Sie hier den ausgewählten Channel basierend auf channelId
        this.getMessagesForSelectedChannel();
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

  getMessagesForSelectedChannel() {
    const channelId = this.selectedChannel.id;
    const groupChatRef = collection(this.firestore, `channels/${channelId}/groupchat`);
  
    this.unsubscribeMessages = onSnapshot(groupChatRef, (querySnapshot) => {
      this.messages = querySnapshot.docs.map(doc => doc.data());
      console.log(this.messages);
    });
  }

  ngOnDestroy() {
    if (this.unsubscribeMessages) {
      this.unsubscribeMessages();
    }
  }
}