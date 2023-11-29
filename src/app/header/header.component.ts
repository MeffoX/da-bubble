import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from '../services/login-service/login.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProfileMenuComponent } from '../dialog/profile-menu/profile-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { GlobalVariablService } from '../services/global-variabl.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items$: Observable<any[]>;
  searchControl = new FormControl();
  user: any;
  screenWidth: number;

  constructor(
    public authService: LoginService, 
    private router: Router, 
    private dialog: MatDialog, 
    public userService: UserService,
    public globalVariable: GlobalVariablService) {}


    ngOnInit() {
      this.updateScreenWidth();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
      this.updateScreenWidth();
    }

    private updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    }

    openWorkspaceResponsiv() {
      this.globalVariable.openWorkspace = true;
      this.globalVariable.openChannelChat = false;
      this.globalVariable.openThread = false;
      this.globalVariable.openDM = false;
      this.globalVariable.openNewMessage = false;
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

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
