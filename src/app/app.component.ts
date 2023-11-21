import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dabubble';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getCurrentUser();
  }
}
