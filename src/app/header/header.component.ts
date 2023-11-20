import { Component } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../dialog/profile-menu/profile-menu.component';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: LoginService, private router: Router, private dialog: MatDialog, public userService: UserService) { }

  searchControl = new FormControl();

  users$ = combineLatest([this.userService.getAllUsers(),
  this.authService.currentUser$,
  this.searchControl.valueChanges
    .pipe(startWith(''))]).pipe(
      map(([users, currentUser, searchString]) =>
        users.filter(u => u.name.toLowerCase()
          .includes(searchString.toLowerCase()) && u.uid !== currentUser.uid)));

  openProfileMenu() {
    this.dialog.open(ProfileMenuComponent, {
      position: { right: '20px', top: '95px' }
    });
  }

  openClickedProfileMenu(user: any) {
    this.userService.selectedUser = user;
    this.dialog.open(ProfileMenuClickedComponent);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
