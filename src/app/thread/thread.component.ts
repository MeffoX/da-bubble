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

  constructor(private threadService: ThreadService) { 
  }

  ngOnInit() {
    this.threadService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
      console.log(this.selectedUser);
    });
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }
}
