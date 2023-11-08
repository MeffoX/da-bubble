import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent {
  displayInput: boolean = false;
  displayTextarea: boolean = false;

  constructor(private dialogRef: MatDialogRef<ChannelComponent>) { }

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
