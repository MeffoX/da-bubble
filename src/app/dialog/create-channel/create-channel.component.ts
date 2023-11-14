import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelAddUserComponent } from '../channel-add-user/channel-add-user.component';
import { ChannelService } from 'src/app/services/channel.service';
import { Channel } from 'src/app/modules/channel.class';

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
    private channelService: ChannelService
    ) {}
  

  closeDialog() {
    this.dialogRef.close();
  }

  closeDialogWithUserAdd() {
    const newChannel = new Channel({
      channelName: this.channelName,
      channelDescription: this.channelDescription
    });
    this.channelService.addChannel(newChannel).then(() => {
      this.dialogRef.close();
      this.dialog.open(ChannelAddUserComponent);
    }).catch(error => {
      console.error('Fehler beim Erstellen des Channels:', error);
    });
  }

}
