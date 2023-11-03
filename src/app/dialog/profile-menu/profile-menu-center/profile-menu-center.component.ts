import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-profile-menu-center',
  templateUrl: './profile-menu-center.component.html',
  styleUrls: ['./profile-menu-center.component.scss']
})

export class ProfileMenuCenterComponent {
  constructor(public authService: LoginService, private dialog: MatDialogRef<ProfileMenuCenterComponent>) { }

  closeDialog() {
    this.dialog.close()
  }
}
