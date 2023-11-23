import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class DirectMessageComponent {
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  messageText: any = '';
  emojiPicker: boolean = false;
  emojiPickerReaction: boolean = false;

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private dialog: MatDialog,
    public dmService: DmService
  ) {}

  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }

  toggleEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  toggleEmojiPickerReaction() {
    this.emojiPickerReaction = !this.emojiPickerReaction;
  }

  addEmoji($event) {
    this.messageText += $event.emoji.native;
    this.emojiPicker = false;
  }

  addReaction(id, $event) {
    let reaction = $event.emoji.native
    this.dmService.updateReaction(id, reaction);
    this.dmService.filterMessages();
    this.emojiPickerReaction = false;
  }

  sendMessage() {
    this.dmService.sendMessage(this.messageText);
    this.messageText = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }
}
