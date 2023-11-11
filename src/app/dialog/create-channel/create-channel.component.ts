import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {

  constructor(private dialogRef: MatDialogRef<CreateChannelComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
