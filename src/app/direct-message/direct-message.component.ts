import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';
import { DmService } from '../services/dm.service';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss'],
})
export class DirectMessageComponent implements OnInit{
  messageText: any = '';
  emojiPicker: boolean = false;

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private dialog: MatDialog,
    public dmService: DmService
  ) {}
  ngOnInit(): void {
  }

  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }

  openEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  addEmoji($event) {
    this.messageText += $event.emoji.native;
    this.emojiPicker = false;
  }

  async sendMessage() {
    this.dmService.sendMessage(this.messageText);
    this.messageText = '';
  }
}
