import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelAddUserComponent } from '../channel-add-user/channel-add-user.component';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/modules/channel.class';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {
  channelName: string = '';
  channelDescription: string = '';

  constructor(
    private dialogRef: MatDialogRef<CreateChannelComponent>, 
    public dialog: MatDialog, 
    private channelService: ChannelService,
    private loginService: LoginService
    ) {}
  
  closeDialog() {
    this.dialogRef.close();
  }

  closeDialogWithUserAdd() {
    const currentUser = this.loginService.getUser();
    const newChannel = new Channel({
      channelName: this.channelName,
      channelDescription: this.channelDescription,
      channelCreatedBy: currentUser ? currentUser.name : null,
      channelCreatedDate: new Date(),
      channelUser: [currentUser.toJSON()]
    }); 
    this.channelService.addChannel(newChannel).then(channelId => {
      this.dialogRef.close();
      this.dialog.open(ChannelAddUserComponent, {
        data: { channelId: channelId }
      });
    }).catch(error => {
      console.error('Fehler beim Erstellen des Channels:', error);
    });
  }
}
