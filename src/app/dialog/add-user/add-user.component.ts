import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  constructor(public authService: LoginService, private dialogRef: MatDialogRef<AddUserComponent>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}
