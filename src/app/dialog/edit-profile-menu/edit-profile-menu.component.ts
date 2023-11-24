import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginService } from 'src/app/services/login-service/login.service';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-profile-menu',
  templateUrl: './edit-profile-menu.component.html',
  styleUrls: ['./edit-profile-menu.component.scss']
})

export class EditProfileMenuComponent implements OnInit {

  firestore: Firestore = Inject(Firestore);
  docRef: any;
  updateData: any;
  user: any;
  isInputReadOnly: boolean = false;

  constructor(public authService: LoginService, public dialogRef: MatDialogRef<EditProfileMenuComponent>,) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.isInputReadOnly = this.authService.isGuestUser();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveEdits() {
    await this.authService.updateUserInFirestore(this.authService.currentUser.uid, { name: this.user.name, email: this.user.email });
    await this.authService.updateUserProfile({
      displayName: this.user.name
    });
    this.isInputReadOnly = true;
    this.closeDialog();
  }
}
