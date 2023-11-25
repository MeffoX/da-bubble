import { Component, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/app/modules/channel.class';
import { ChannelService } from 'src/app/services/channel.service';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChannelComponent {
  displayInput: boolean = false;
  displayTextarea: boolean = false;
  channels$ = this.channelService.getChannels();
  newChannelName: string = '';
  newChannelDescription: string = '';

  constructor(private dialogRef: MatDialogRef<ChannelComponent>,
    public channelService: ChannelService,
    public loginService: LoginService) { }

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

  updateChannelName() {
    const channelId = this.channelService.selectedChannel.id;
    if (this.newChannelName) {
      const updates: Partial<Channel> = {
        channelName: this.newChannelName
      };
      this.channelService.selectedChannel.channelName = this.newChannelName;
      this.toggleChanelName();
      this.updateChannelAndCloseDialog(channelId, updates);
    }
  }

  updateChannelDescription() {
    const channelId = this.channelService.selectedChannel.id;
    if (this.newChannelDescription) {
      const updates: Partial<Channel> = {
        channelDescription: this.newChannelDescription
      };
      this.channelService.selectedChannel.channelDescription = this.newChannelDescription;
      this.toggleChanelDescription();
      this.updateChannelAndCloseDialog(channelId, updates);
    }
  }

  private updateChannelAndCloseDialog(channelId: string, updates: Partial<Channel>): void {
    this.channelService.updateChannel(channelId, updates).then(() => {
    }).finally(() => {
      this.closeDialog();
    });
  }

  public updateCreatorNameAfterNameChange() {
    this.channelService.selectedChannel.channelCreatedBy = this.loginService.currentUser.name;
  }
}