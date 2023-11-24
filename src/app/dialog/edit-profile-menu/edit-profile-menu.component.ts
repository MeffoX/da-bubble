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


  constructor(public authService: LoginService, public dialogRef: MatDialogRef<EditProfileMenuComponent>,) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async saveEdits() {
    if (this.user.name && this.user.email) {
      try {
        await this.authService.updateUserInFirestore(this.authService.currentUser.uid, { name: this.user.name, email: this.user.email });
        await this.authService.updateUserProfile({
          displayName: this.user.name
        });
        console.log('Benutzerdaten erfolgreich aktualisiert');
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Benutzerdaten', error);
      }
    } else {
      console.error('Ungültige Werte für Name oder E-Mail');
    }
    this.closeDialog();
  }
}
