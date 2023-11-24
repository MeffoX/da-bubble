import { Component } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../dialog/profile-menu/profile-menu.component';
import { ProfileMenuClickedComponent } from '../dialog/profile-menu-clicked/profile-menu-clicked.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { CombinedSearchService } from '../services/combined-search.service';


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
    public userService: UserService,
    private combinedSearchService: CombinedSearchService,) {
    this.searchControl.valueChanges.subscribe(searchString => {
      this.combinedSearchService.setSearchString(searchString);
    });
    this.items$ = this.combinedSearchService.getCombinedSearchResults();
  }

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
