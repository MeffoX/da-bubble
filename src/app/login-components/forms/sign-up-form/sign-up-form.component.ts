import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { LoginService } from 'src/app/services/login-service/login.service';


export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  @Input() legalNotice: boolean;
  @Output() legalNoticeChange = new EventEmitter<boolean>();
  avatarForm = false;

  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      checkbox: new FormControl(false, Validators.requiredTrue),
    },
    { validators: passwordMatchValidator() }
  );

  constructor(
    private authService: LoginService,
    private toast: HotToastService,
  ) {}

  reloadPage() {
    location.reload();
  }

  openLegalNotice() {
    this.legalNoticeChange.emit(true);
  }

  submit() {
    if (!this.signUpForm.valid) return;
    const { name, email, password } = this.signUpForm.value;
    this.authService
      .signUp(name, email, password)
      .pipe(
        this.toast.observe({
          success: 'Gratulation! Sie wurden angemeldet',
          loading: 'Anmeldung läuft',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.avatarForm = true;
      });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
}