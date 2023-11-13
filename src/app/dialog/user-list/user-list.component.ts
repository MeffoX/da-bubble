import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(private dialogRef: MatDialogRef<UserListComponent>, public dialog: MatDialog, public authService: LoginService) {}

  closeDialog() {
    this.dialogRef.close();
  }

  addUser() {
    this.dialog.open(AddUserComponent);
    this.closeDialog();
  }
}
