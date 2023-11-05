import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: LoginService,
    private router: Router,
    private toast: HotToastService,
  ) {}

  getEmail() {
    return this.loginForm.get('email');
  }

  getPassword() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Erfolgreich Angemeldet',
        loading: 'Anmeldung läuft...',
        error: 'Es ist ein Fehler aufgetreten'
      })
    ).subscribe(() => {
      this.router.navigate(['main']);
    });
  }

  googleLogin() {
    this.authService.googleSignIn();
  }

  guestLogin() {
    this.authService.login('gast@gmail.com', '123456').pipe(
      this.toast.observe({
        success: 'Erfolgreich Angemeldet',
        loading: 'Anmeldung läuft...',
        error: 'Es ist ein Fehler aufgetreten'
      })
    ).subscribe(() => {
      this.router.navigate(['main']);
    });
  }
}

