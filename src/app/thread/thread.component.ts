import { Component } from '@angular/core';
import { MainChatComponent } from '../main-chat/main-chat.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent {

  constructor(
    public mainChat: MainChatComponent
  ) { }
}
