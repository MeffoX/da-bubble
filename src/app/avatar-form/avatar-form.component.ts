import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss']
})
export class AvatarFormComponent {
avatars = [
  './assets/img/avatar/avatar1.png',
  './assets/img/avatar/avatar2.png',
  './assets/img/avatar/avatar3.png',
  './assets/img/avatar/avatar4.png',
  './assets/img/avatar/avatar5.png',
  './assets/img/avatar/avatar6.png'
]

avatar = './assets/img/avatar/avatar0.png'

constructor() {}

getAvatar(selectedAvatar: string) {
  this.avatar = selectedAvatar;
}

}
