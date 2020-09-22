import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from "./register/register.component";
import { WelcomeComponent } from './welcome/welcome.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, WelcomeComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MdModule,
    FlexLayoutModule,
      ReactiveFormsModule,
      FormsModule
  ]
})
export class AuthModule { }
