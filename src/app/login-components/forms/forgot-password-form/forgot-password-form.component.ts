import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html',
  styleUrls: ['./forgot-password-form.component.scss'],
})
export class ForgotPasswordFormComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  constructor(private toast: HotToastService) {}

  async onSubmit(event: any) {
    debugger;
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = this.forgotPasswordForm.get('email')?.value;
    try {
      const resetLink = `https://dschabrail-isaev.developerakademie.net/dabubble/reset-password?email=${email}`;
      const mailBody = this.emailText() + ` ${resetLink}`;
      await fetch('https://formspree.io/f/mjvqzpzy', {
        method: 'POST',
        body: JSON.stringify({ email, message: mailBody }),
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  emailText() {
    return 'Hallo, wir haben dir ein Link zum zurücksetzten deines Passwortes verschickt. Klicke auf den folgenden Link um dein Passwort zurückzusetzten:'
  }

  reloadPage() {
    location.reload();
  }
}
