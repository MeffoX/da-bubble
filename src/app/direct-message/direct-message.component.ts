import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { User } from '@angular/fire/auth';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent {
  currentUser: User | null = null;

  constructor(
  public userService: UserService, 
  public loginService: LoginService,
  private dialog: MatDialog
  ) {}


  openProfilInfo() {
    
  }

  openProfile() {
    this.dialog.open(ProfileMenuClickedComponent);
  }
}
