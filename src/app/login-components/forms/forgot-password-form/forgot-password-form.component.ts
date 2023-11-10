import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/services/login-service/login.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(private toast: HotToastService, private authService: LoginService,) {}


  async onSubmit(event: any) {
    event.preventDefault();

    if (this.forgotPasswordForm.invalid) {
      this.toast.error('Bitte überprüfen Sie Ihre Eingaben.');
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;

    try {
      await this.authService.sendPasswordResetEmail(email);
      this.toast.success('Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet.');
    } catch (error) {
      this.toast.error('Fehler beim Senden der E-Mail zum Zurücksetzen des Passworts.');
    }
  }

  reloadPage() {
    location.reload();
  }

  getEmail() {
    return this.forgotPasswordForm.get('email');
  }
}
