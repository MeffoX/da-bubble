import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service/login.service';
import { User } from '@angular/fire/auth';

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
  ) {}


  openProfilInfo() {
    
  }
}
