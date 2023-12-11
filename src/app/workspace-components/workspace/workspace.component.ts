import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';
import { CreateChannelComponent } from 'src/app/dialog/create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login-service/login.service';
import { GlobalVariablService } from 'src/app/services/global-variabl.service';
import { MainChatComponent } from 'src/app/main-chat/main-chat.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  isListHidden = false;
  isContactHidden = false;
  users: any[] = [];
  currentUser: User | null = null;
  private authSubscription: Subscription | null = null;
  channels: any[] = [];
  items$: any;

  constructor(
    public router: Router,
    private userService: UserService,
    private channelService: ChannelService,
    public dialog: MatDialog,
    private loginService: LoginService,
    public globalVariable: GlobalVariablService,
    public mainChat: MainChatComponent
  ) {}

  /**
   * Initializes the component by subscribing to the user, loading users, and loading channels.
   */
  ngOnInit(): void {
    // Subscribe to changes in the current user
    this.authSubscription = this.loginService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    // Load all users
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );

    // Load all channels
    this.channelService.getChannels().subscribe((channels) => {
      this.channels = channels;
    });
  }

  /**
   * Toggles the visibility of the user list.
   */
  toggleList(): void {
    this.isListHidden = !this.isListHidden;
  }

  /**
   * Toggles the visibility of the contacts list.
   */
  toggleContacts(): void {
    this.isContactHidden = !this.isContactHidden;
  }

  /**
   * Opens the dialog to create a new channel.
   */
  openCreateChannelDialog(): void {
    const currentUser = this.loginService.getUser();
    if (currentUser) {
      this.dialog.open(CreateChannelComponent);
    }
  }

  /**
   * Unsubscribes from the user subscription when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Selects a user and updates global variables for the workspace.
   * @param user - The selected user.
   */
  selectUser(user: any): void {
    this.userService.selectedUser = user;
    this.globalVariable.openChannelChat = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = true;
    this.globalVariable.openNewMessage = false;
    this.closeWorkspace();
  }

/**
 * Opens a channel and updates global variables for the workspace.
 * @param channel - The selected channel.
 */
openChannel(channel: any): void {
  this.channelService.selectedChannel = channel;
  this.channelService.formattedDate();
  this.channelService.getChannelUsers(channel.id).subscribe(users => {
    this.channelService.selectedChannel.users = users;
  });
  this.globalVariable.openDM = false;
  this.globalVariable.openThread = false;
  this.globalVariable.openChannelChat = true;
  this.globalVariable.openNewMessage = false;
  this.closeWorkspace();
}

  /**
   * Opens the view for creating a new message.
   */
  openNewMessage(): void {
    this.globalVariable.openChannelChat = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = false;
    this.globalVariable.openNewMessage = true;
    this.closeWorkspace();
  }

  /**
   * Closes the workspace if the window width is less than or equal to 1000 pixels.
   */
  closeWorkspace(): void {
    if (window.innerWidth <= 1000) {
      this.globalVariable.openWorkspace = false;
    }
  }
}
