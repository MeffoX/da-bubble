import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  displayInput: boolean = false;
  displayTextarea: boolean = false;
  channels$ = this.channelService.getChannels();

  constructor(private dialogRef: MatDialogRef<ChannelComponent>,
    public channelService: ChannelService) { }

  toggleChanelName() {
    this.displayInput = !this.displayInput;
  }

  toggleChanelDescription() {
    this.displayTextarea = !this.displayTextarea;
  }

  leaveChanel() {
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
