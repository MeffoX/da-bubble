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
  messageId: string = '';

  constructor(
    public userService: UserService,
    public loginService: LoginService,
    private dialog: MatDialog,
    public dmService: DmService
  ) {}

  /**
 * Opens the profile menu dialog.
 * @returns {void}
 */
  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }

  /**
 * Toggles the emoji picker visibility for adding reactions.
 * @returns {void}
 */
  toggleEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  /**
 * Toggles the emoji picker visibility for adding reactions to a specific message.
 * @param {string} id - The ID of the message for which the reaction is being added.
 * @returns {void}
 */
  toggleEmojiPickerReaction(id) {
    this.messageId= id;
    this.emojiPickerReaction = !this.emojiPickerReaction;
  }

  /**
 * Adds an emoji to the message text.
 * @param {any} $event - The event object containing the selected emoji.
 * @returns {void}
 */
  addEmoji($event) {
    this.messageText += $event.emoji.native;
    this.emojiPicker = false;
  }

  /**
 * Adds a reaction emoji to a specific message.
 * @param {any} $event - The event object containing the selected emoji.
 * @returns {void}
 */
  addReaction($event) {
    let reaction = $event.emoji.native;
    this.dmService.updateReaction(this.messageId, reaction);
    this.dmService.filterMessages();
    this.emojiPickerReaction = false;
  }

  /**
 * Sends a message, clears the message text, and scrolls to the bottom of the chat.
 * @returns {void}
 */
  sendMessage() {
    if (this.messageText.length > 0) {
    this.dmService.sendMessage(this.messageText);
    this.messageText = '';
    this.scrollToBottom();
    }
  }

  /**
 * Scrolls to the bottom of the chat container.
 * @returns {void}
 */
  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }
}
