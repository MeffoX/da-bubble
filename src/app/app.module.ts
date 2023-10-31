import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
<<<<<<< Updated upstream
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
=======
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { getStorage } from "firebase/storage";
>>>>>>> Stashed changes
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroComponent } from './login-components/intro/intro.component';
import { LoginComponent } from './login-components/login/login.component';
import { ForgotPasswordComponent } from './login-components/forgot-password/forgot-password.component';
import { SignUpComponent } from './login-components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './login-components/reset-password/reset-password.component';
<<<<<<< Updated upstream
import { WorkspaceComponent } from './workspace-components/workspace/workspace.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
=======
import { LoginFormComponent } from './login-components/forms/login-form/login-form.component';
import { SignUpFormComponent } from './login-components/forms/sign-up-form/sign-up-form.component';
import { ForgotPasswordFormComponent } from './login-components/forms/forgot-password-form/forgot-password-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HotToastModule } from '@ngneat/hot-toast';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AvatarFormComponent } from './avatar-form/avatar-form.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    ResetPasswordComponent,
<<<<<<< Updated upstream
    WorkspaceComponent,
    HeaderComponent
=======
    LoginFormComponent,
    SignUpFormComponent,
    ForgotPasswordFormComponent,
    AvatarFormComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
<<<<<<< Updated upstream
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule
=======
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
    MatIconModule,
>>>>>>> Stashed changes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
