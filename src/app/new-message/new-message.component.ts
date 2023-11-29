import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { GlobalVariablService } from '../services/global-variabl.service';
import { LoginService } from '../services/login-service/login.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent {
  items$: any;

  constructor(
    public loginService: LoginService,
    public userService: UserService,
    public globalVariable: GlobalVariablService,
  ){}

  selectUser(user) {
    this.userService.selectedUser = user;
    this.globalVariable.openChannelChat = false;
    this.globalVariable.openThread = false;
    this.globalVariable.openDM = true;
    this.globalVariable.openNewMessage=false;
  }

  onUserSelected(user: any) {
    this.selectUser(user);
  }
}
