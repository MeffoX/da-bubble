import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = false;
  signUpForm = true;
  forgotPasswordForm = false;

  openSignUpForm() {
    this.loginForm = false;
    this.signUpForm= true;
  }
}
