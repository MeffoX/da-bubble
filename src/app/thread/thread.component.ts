import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { ThreadService } from '../services/thread.service';
import { ChannelService } from '../services/channel.service';
import { LoginService } from '../services/login-service/login.service';
import { GlobalVariablService } from '../services/global-variabl.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  selectedUser: any;
  message: any = '';
  emojiPicker: boolean = false;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  constructor(
    public threadService: ThreadService,
    public mainChat: MainChatComponent,
    public channelService: ChannelService,
    public loginService: LoginService,
    public globalVariable: GlobalVariablService
  ) { }

  ngOnInit() {
    this.threadService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  toggleEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  addEmoji($event) {
    this.message += $event.emoji.native;
    this.emojiPicker = false;
  }

  sendMessage() {
    this.threadService.sendMessage(this.message);
    this.message = '';
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop =
      this.scrollContainer.nativeElement.scrollHeight;
  }

  closeThread() {
    this.globalVariable.openChannelChat = true;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = false;
    this.globalVariable.openNewMessage = false;
  }
}
