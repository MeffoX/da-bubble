import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroComponent } from './login-components/intro/intro.component';
import { LoginComponent } from './login-components/login/login.component';
import { ForgotPasswordComponent } from './login-components/forgot-password/forgot-password.component';
import { SignUpComponent } from './login-components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './login-components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
