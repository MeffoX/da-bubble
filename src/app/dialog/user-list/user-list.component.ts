import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { LoginService } from 'src/app/services/login-service/login.service';
import { ChannelService } from 'src/app/services/channel.service';
import { ChannelService } from 'src/app/services/channel.service'; // Angenommen, Sie haben einen solchen Service

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  channelUsers: any[] = []; // Hält die Benutzer des ausgewählten Kanals

  constructor(
    private dialogRef: MatDialogRef<UserListComponent>, 
    public dialog: MatDialog, 
    public authService: LoginService,
    private channelService: ChannelService // Fügen Sie ChannelService hinzu
  ) {}

  ngOnInit() {
    this.channelUsers = this.channelService.selectedChannel?.users || [];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  addUser() {
    this.dialog.open(AddUserComponent);
    this.closeDialog();
  }
}
