import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = false;
  signUpForm = false;
  forgotPasswordForm = true;
  legalNotice = false;

  openSignUpForm() {
    this.loginForm = false;
    this.signUpForm= true;
  }

  onLegalNoticeChange(updatedStatus: boolean) {
    this.legalNotice = updatedStatus;
    this.signUpForm = !updatedStatus;
  }

  onForgotPasswordFormChange(updatedStatus: boolean) {
    this.forgotPasswordForm = updatedStatus;
    this.loginForm = !updatedStatus;
  }

  openLegalNotice() {
    this.legalNotice = true;
    this.loginForm = false;
    this.signUpForm = false;
    this.forgotPasswordForm = false;
  }
}
