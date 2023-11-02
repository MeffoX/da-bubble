import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-edit-profile-menu',
  templateUrl: './edit-profile-menu.component.html',
  styleUrls: ['./edit-profile-menu.component.scss']
})
export class EditProfileMenuComponent {
  constructor(public authService: LoginService, public dialogRef: MatDialogRef<EditProfileMenuComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
