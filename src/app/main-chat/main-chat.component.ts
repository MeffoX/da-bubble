import { Component } from '@angular/core';
import { UserListComponent } from '../dialog/user-list/user-list.component';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { ChannelComponent } from '../dialog/channel/channel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {

  constructor(public dialog: MatDialog) {}

  openUserListDialog() {
    this.dialog.open(UserListComponent);
  }

  openAddUserDialog() {
    this.dialog.open(AddUserComponent);
  }

  openChannelDialog() {
    this.dialog.open(ChannelComponent);
  }
}
