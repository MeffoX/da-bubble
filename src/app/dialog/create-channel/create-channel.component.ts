import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChannelAddUserComponent } from '../channel-add-user/channel-add-user.component';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent {

  constructor(private dialogRef: MatDialogRef<CreateChannelComponent>, public dialog: MatDialog) {}

  closeDialog() {
    this.dialogRef.close();
  }

  closeDialogWithUserAdd() {
    this.dialogRef.close();
    this.dialog.open(ChannelAddUserComponent);
  }

}
