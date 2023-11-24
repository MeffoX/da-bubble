import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service/login.service';
import { EditProfileMenuComponent } from '../edit-profile-menu/edit-profile-menu.component';
import { User } from 'src/app/modules/user.class';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {

  user: User;

  constructor(public authService: LoginService,
    public dialogRef: MatDialogRef<ProfileMenuComponent>,
    private dialog: MatDialog) {
    this.user = this.authService.currentUser;
  }

  ngOnInit(): void {
  }

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
