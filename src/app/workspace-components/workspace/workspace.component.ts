import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';
import { CreateChannelComponent } from 'src/app/dialog/create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login-service/login.service';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspaceIsOpen = true;
  isListHidden = false;
  isContactHidden = false;
  users: any[] = [];
  currentUser: User | null = null;
  private authSubscription: Subscription | null = null;
  channels: any[] = [];

  constructor(
    public router: Router, 
    private userService: UserService, 
    private channelService: ChannelService,
    public dialog: MatDialog,
    private loginService: LoginService,
    ) { }

  
    ngOnInit() {
      this.authSubscription = this.loginService.currentUser$.subscribe(
        user => {
          this.currentUser = user;
        });

      this.userService.getAllUsers().subscribe(
        users => {
          console.log('Users loaded:', users); // Hier sehen Sie die geladenen Benutzer
          this.users = users;
        },
        error => {
          console.error('Error loading users:', error); // Fehlerbehandlung, falls etwas schief geht
        }
      );
  
      this.channelService.getChannels().subscribe(channels => {
        this.channels = channels;
      });
    }
  

  toggleImageRotation() {
    this.workspaceIsOpen = !this.workspaceIsOpen;
  }

  toggleList(): void {
    this.isListHidden = !this.isListHidden;
  }

  toggleContacts(): void {
    this.isContactHidden = !this.isContactHidden;
  
  }

  openCreateChannelDialog() {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser) {
      console.log('Aktueller Benutzername:', currentUser.name); // 'name' aus Ihrer User-Klasse
    } else {
      console.log('Kein Benutzer angemeldet');
    }

    this.dialog.open(CreateChannelComponent);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
