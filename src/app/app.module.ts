import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntroComponent } from './login-components/intro/intro.component';
import { LoginComponent } from './login-components/login/login.component';
import { ForgotPasswordComponent } from './login-components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-components/reset-password/reset-password.component';
import { WorkspaceComponent } from './workspace-components/workspace/workspace.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { LoginFormComponent } from './login-components/forms/login-form/login-form.component';
import { SignUpFormComponent } from './login-components/forms/sign-up-form/sign-up-form.component';
import { ForgotPasswordFormComponent } from './login-components/forms/forgot-password-form/forgot-password-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HotToastModule } from '@ngneat/hot-toast';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarFormComponent } from './login-components/forms/avatar-form/avatar-form.component';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from './dialog/profile-menu/profile-menu.component';
import { EditProfileMenuComponent } from './dialog/edit-profile-menu/edit-profile-menu.component';
import { ProfileMenuCenterComponent } from './dialog/profile-menu-center/profile-menu-center.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { ChannelComponent } from './dialog/channel/channel.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WorkspaceComponent,
    HeaderComponent,
    LoginFormComponent,
    SignUpFormComponent,
    ForgotPasswordFormComponent,
    AvatarFormComponent,
    ProfileMenuComponent,
    EditProfileMenuComponent,
    ProfileMenuCenterComponent,
    AddUserComponent,
    ChannelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTreeModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    HotToastModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
