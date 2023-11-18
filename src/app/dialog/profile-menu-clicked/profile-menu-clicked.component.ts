import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service/login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { GlobalVariablService } from 'src/app/services/global-variabl.service';

@Component({
  selector: 'app-profile-menu-clicked',
  templateUrl: './profile-menu-clicked.component.html',
  styleUrls: ['./profile-menu-clicked.component.scss']
})
export class ProfileMenuClickedComponent implements OnInit {

  constructor(public loginService: LoginService,
    private dialog: MatDialogRef<ProfileMenuClickedComponent>,
    private userService: UserService,
    private globalVariable: GlobalVariablService) { }

  ngOnInit(): void {
  }

  selectUser(user: any) {
    user = this.userService.selectedUser;
    this.globalVariable.openChannelChat = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = true;
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.close();
  }

}
