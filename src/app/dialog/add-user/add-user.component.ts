import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  searchControl = new FormControl();
  filteredUsers$: Observable<any[]>;
  selectedUsers: any[] = [];
  currentChannel: any;

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    private channelService: ChannelService
  ) {}

  ngOnInit() {
    this.currentChannel = this.channelService.selectedChannel;

    this.filteredUsers$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.userService.getAllUsers().pipe(
        map(users => this._filter(users, value))
      ))
    );
  }

  private _filter(users: any[], searchValue: string): any[] {
    const filterValue = searchValue.toLowerCase();
    return users.filter(user =>
      !this.currentChannel.users.some(channelUser => channelUser.uid === user.uid) &&
      user.name.toLowerCase().includes(filterValue)
    );
  }

  selectUser(user: any) {
    if (!this.selectedUsers.some(selectedUser => selectedUser.uid === user.uid)) {
      this.selectedUsers.push(user);
    }
  }

  onOptionSelected() {
    this.searchControl.setValue('');
  }

  addSelectedUsersToChannel() {
    Promise.all(this.selectedUsers.map(user => 
      this.channelService.addUserToChannel(this.currentChannel.id, user)
    )).then(() => {
      this.channelService.getChannelUsers(this.currentChannel.id).subscribe(users => {
        this.currentChannel.users = users;
        this.channelService.selectedChannel = this.currentChannel;
      });
      this.selectedUsers = [];
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
