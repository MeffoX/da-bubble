import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login-service/login.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { AvatarUploadService } from 'src/app/services/login-service/avatar-upload.service';

@Component({
  selector: 'app-avatar-form',
  templateUrl: './avatar-form.component.html',
  styleUrls: ['./avatar-form.component.scss'],
})
export class AvatarFormComponent {
  avatars = [
    './assets/img/avatar/avatar1.png',
    './assets/img/avatar/avatar2.png',
    './assets/img/avatar/avatar3.png',
    './assets/img/avatar/avatar4.png',
    './assets/img/avatar/avatar5.png',
    './assets/img/avatar/avatar6.png',
  ];

  avatar = './assets/img/avatar/avatar0.png';
  isUploading = false;

  constructor(
    public loginService: LoginService,
    private avatarUploadService: AvatarUploadService,
    private router: Router,
  ) {}

  getAvatar(selectedAvatar: string) {
    this.avatar = selectedAvatar;
  }

  uploadImage(user: User) {
    this.isUploading = true;
  
    this.avatarUploadService
      .uploadImageFromPath(this.avatar, `profil/${user.uid}`)
      .subscribe((photoURL) => {
        this.loginService.updateUserProfile({ photoURL })
          .then(() => {
            this.loginService.updateUserInFirestore(user.uid, { avatarUrl: photoURL });
          })
          .then(() => {
            this.router.navigate(['main']);
          })
          .catch((error) => {
            console.log(error);
            this.isUploading = false;
          });
      });
  }
  
}
