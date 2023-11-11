import { Component } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../dialog/profile-menu/profile-menu.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: LoginService, private router: Router, private dialog: MatDialog) { }

  openProfileMenu() {
    this.dialog.open(ProfileMenuComponent, {
      position: { right: '20px', top: '95px' }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
