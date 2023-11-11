import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ChannelService } from 'src/app/services/channel.service';
import { CreateChannelComponent } from 'src/app/dialog/create-channel/create-channel.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  workspaceIsOpen = true;
  users: any[] = [];
  channels: any[] = [];

  constructor(
    public router: Router, 
    private userService: UserService, 
    private channelService: ChannelService,
    public dialog: MatDialog
    ) { }

  
    ngOnInit() {
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

  openCreateChannelDialog() {
    this.dialog.open(CreateChannelComponent);
  }
}
