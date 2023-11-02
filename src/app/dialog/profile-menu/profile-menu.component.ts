import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service/login.service';
import { EditProfileMenuComponent } from './edit-profile-menu/edit-profile-menu.component';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent {
  constructor(public authService: LoginService, public dialogRef: MatDialogRef<ProfileMenuComponent>, private dialog: MatDialog) { }

  openEditProfileMenu() {
    this.dialog.open(EditProfileMenuComponent, {
      position: { right: '20px', top: '95px' }
    });
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
