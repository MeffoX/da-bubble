import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-channel-add-user',
  templateUrl: './channel-add-user.component.html',
  styleUrls: ['./channel-add-user.component.scss'],
})
export class ChannelAddUserComponent implements OnInit {
  variants: string[] = ['Alle Mitglieder von OfficeTeam hinzufügen', 'Bestimmte Leute hinzufügen']
  displayInput: boolean = false;
  selectedUser: string = '';

  constructor(
    private dialogRef: MatDialogRef<ChannelAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Channel-ID als Daten übergeben
    private channelService: ChannelService
  ) { }

  ngOnInit(): void {
    
  }

  addUsersToChannel() {
    if (this.selectedUser) {
      this.channelService.addUserToChannel(this.data.channelId, this.selectedUser)
        .then(() => {
        })
        .catch(error => {
          console.error('Fehler beim Hinzufügen von Benutzern:', error);
        });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onRadioChange(variant: string) {
    if (variant === 'Bestimmte Leute hinzufügen') {
      this.displayInput = false;
    } else {
      this.displayInput = true;
    }
  }

  createChannel() {
    this.closeDialog();
  }
}
