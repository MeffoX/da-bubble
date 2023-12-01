import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-components/login/login.component';
import { ResetPasswordComponent } from './login-components/reset-password/reset-password.component';
import { MainComponent } from './main/main.component';
import { MainChatComponent } from './main-chat/main-chat.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: MainComponent }, // Platzhalter für Standardansicht
      { path: ':channelId', component: MainChatComponent }
    ],
  },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
