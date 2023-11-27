import { Component, Injectable, OnInit } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel.service';
import { Observable } from 'rxjs';
import { GroupchatService } from '../services/groupchat.service';

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
  message: any;
  messageText: any = '';

  constructor(
    public dialog: MatDialog,
    public channelService: ChannelService,
    public groupchat: GroupchatService
  ) {}

  ngOnInit() {
    this.channelService.getChannels().subscribe((channels) => {
      this.channels = channels;
      channels.forEach(channel => {
        this.channelService.getChannelUsers(channel.id).subscribe(users => {
          channel.users = users;
        }, error => {
          console.error(`Fehler beim Laden der Benutzer für Kanal ${channel.id}:`, error);
        });
      });
    }, error => {
      console.error('Fehler beim Laden der Kanäle:', error);
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
    this.groupchat.sendMessage(this.messageText);
    this.messageText = '';
  }
}
