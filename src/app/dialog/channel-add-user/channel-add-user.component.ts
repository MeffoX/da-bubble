import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from 'src/app/services/channel.service';
import { UserSearchService } from 'src/app/services/user-service.service';
import { FormControl } from '@angular/forms';
import { Channel } from 'src/app/modules/channel.class';

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
  searchControl = new FormControl();
  currentChannel: Channel = new Channel();
  users$ = this.userSearchService.getSearchResults();

  constructor(
    private dialogRef: MatDialogRef<ChannelAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private channelService: ChannelService,
    public userSearchService: UserSearchService
  ) {
    this.searchControl.valueChanges.subscribe(value => {
      this.userSearchService.setSearchString(value);
    });
   }

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
    if (this.selectedVariant === 'Bestimmte Leute hinzufügen') {
      this.currentChannel.channelUser.forEach(user => {
        this.channelService.addUserToChannel(this.data.channelId, user);
      });
    } else {
      this.addAllUsersToChannel();
    }
    this.closeDialog();
  }
  
  addAllUsersToChannel() {
    this.channelService.getAllUsers().then(users => {
      const updatePromises = users.map(user => {
        return this.channelService.addUserToChannel(this.data.channelId, user);
      });

      Promise.all(updatePromises)
        .then(() => { /* Erfolgsmeldung */ })
        .catch(error => {
          console.error('Fehler beim Hinzufügen der Benutzer zum Channel:', error);
        });
    });
  }

  onSearchChange(searchString: string) {
    this.userSearchService.setSearchString(searchString);
  }

  onSelectUser(user: any) {
    if (!this.currentChannel.channelUser.some(channelUser => channelUser.uid === user.uid)) {
      this.currentChannel.channelUser.push(user);
      this.searchControl.setValue('');
    }
  }

  userSelected(user: any) {
    if (user && !this.currentChannel.channelUser.some(channelUser => channelUser.uid === user.uid)) {
      this.currentChannel.channelUser.push(user);
      this.searchControl.setValue(user.name);
    }
  }
}
