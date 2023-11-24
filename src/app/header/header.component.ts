import { Component } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../dialog/profile-menu/profile-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  items$: Observable<any[]>;
  searchControl = new FormControl();
  user: any;

  constructor(
    public authService: LoginService, 
    private router: Router, 
    private dialog: MatDialog, 
    public userService: UserService) {}


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

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
