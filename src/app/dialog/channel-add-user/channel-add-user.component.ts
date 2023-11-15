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
  selectedVariant: string = '';

  constructor(
    private dialogRef: MatDialogRef<ChannelAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private channelService: ChannelService
  ) { }

  ngOnInit(): void {
    if (!this.data || !this.data.channelId) {
      this.closeDialog();
      return;
    }
  }
  

  closeDialog() {
    this.dialogRef.close();
  }

  onRadioChange(variant: string) {
    this.displayInput = variant === 'Alle Mitglieder von OfficeTeam hinzufügen';
  }


  createChannel() {
    if (this.selectedVariant === 'Alle Mitglieder von OfficeTeam hinzufügen') {
      //einzelne nutzer hinzufügen
    } else {
      this.addAllUsersToChannel();
    }
    this.closeDialog();
  }

  addAllUsersToChannel() {
    this.channelService.getAllUsers().then(userNames => {
      const updatePromises = userNames.map(userName => {
        return this.channelService.addUserToChannel(this.data.channelId, userName);
      });
  
      Promise.all(updatePromises)
        .then(() => {
          console.log('Alle Benutzer wurden zum Channel hinzugefügt.');
        })
        .catch(error => {
          console.error('Fehler beim Hinzufügen der Benutzer zum Channel:', error);
        });
    });
  }

}
