import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { ThreadService } from '../services/thread.service';
import { ChannelService } from '../services/channel.service';
import { LoginService } from '../services/login-service/login.service';
import { GlobalVariablService } from '../services/global-variabl.service';
import { UploadService } from '../services/upload.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements AfterViewChecked {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  selectedUser: any;
  message: any = '';
  emojiPicker: boolean = false;

  constructor(
    public threadService: ThreadService,
    public mainChat: MainChatComponent,
    public channelService: ChannelService,
    public loginService: LoginService,
    public globalVariable: GlobalVariablService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.threadService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  toggleEmojiPicker() {
    this.emojiPicker = !this.emojiPicker;
  }

  addEmoji($event) {
    this.message += $event.emoji.native;
    this.emojiPicker = false;
  }

  sendMessage() {
    if (this.message.length > 0) {
      this.threadService.sendMessage(this.message);
      this.message = '';
      this.scrollToBottom();
    }
  }

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(files: FileList) {
    const fileToUpload = files.item(0);
    if (fileToUpload) {
      if (!this.uploadService.checkFileSize(fileToUpload)) {
        window.alert('Datei ist zu groß. Maximale Dateigröße ist 2 MB.');
        return;
      }

      this.uploadService.uploadFile(fileToUpload).then(downloadURL => {
        this.sendMediaMessage(fileToUpload, downloadURL);
      }).catch(error => {
        console.error("Fehler beim Hochladen: ", error);
      });
    }
  }

  sendMediaMessage(file: File, downloadURL: string) {
    const currentTimestamp = Timestamp.now().toDate();

    const message = {
      text: this.message,
      senderId: this.loginService.currentUser.uid,
      sentDate: currentTimestamp.toLocaleDateString(),
      sentTime: `${currentTimestamp.getHours()}:${currentTimestamp.getMinutes()}`,
      send: Timestamp.now(),
      avatarUrl: this.loginService.currentUser.avatarUrl,
      name: this.loginService.currentUser.name,
      reaction: null,
      messageId: '',
      mediaUrl: downloadURL,
      fileName: file.name,
    };

    this.message = message;
    this.threadService.sendMessage(this.message);

  }

  formatTime(time): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('de-DE', options).format(date);
  }

  scrollToBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  closeThread() {
    this.globalVariable.openChannelChat = true;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = false;
    this.globalVariable.openNewMessage = false;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
}
