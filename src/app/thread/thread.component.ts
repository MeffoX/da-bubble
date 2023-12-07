import { Component } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {
  selectedUser: any;
  message: string;
  messages: any[] = [];  // Neue Eigenschaft, um Nachrichten zu speichern

  constructor(public threadService: ThreadService, public mainChat: MainChatComponent) { 
  }

  ngOnInit() {
    this.threadService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  sendMessage() {
    this.threadService.sendMessage(this.message);
    this.message = '';
  }
}
