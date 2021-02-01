import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {SelectCategoryComponent} from './select-category/select-category.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {AuthGuard} from "../services/auth-guard.service";
import {PasswordResetComponent} from "./password-reset/password-reset.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'select-category',
    component: SelectCategoryComponent
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
