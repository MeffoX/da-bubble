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
import { LegalNoticeComponent } from './login-components/forms/legal-notice/legal-notice.component';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { ChannelComponent } from './dialog/channel/channel.component';
import { CreateChannelComponent } from './dialog/create-channel/create-channel.component';
import { MainComponent } from './main/main.component';
import { ChannelAddUserComponent } from './dialog/channel-add-user/channel-add-user.component';
import { MatRadioModule } from '@angular/material/radio';
import { UserListComponent } from './dialog/user-list/user-list.component';
import { MainChatComponent } from './main-chat/main-chat.component';
import { FormsModule } from '@angular/forms';
import { DirectMessageComponent } from './direct-message/direct-message.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ThreadComponent } from './thread/thread.component';
import { ProfileMenuClickedComponent } from './dialog/profile-menu-clicked/profile-menu-clicked.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { SearchBarComponent } from './search-bar/search-bar.component';



@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    LoginComponent,
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
    LegalNoticeComponent,
    AddUserComponent,
    ChannelComponent,
    CreateChannelComponent,
    MainComponent,
    ChannelAddUserComponent,
    UserListComponent,
    MainChatComponent,
    DirectMessageComponent,
    ThreadComponent,
    ProfileMenuClickedComponent,
    SearchBarComponent,
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
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    PickerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
