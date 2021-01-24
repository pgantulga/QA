import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from "./register/register.component";
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import {LayoutModule} from "../layout/layout.module";
import { SelectCategoryComponent } from './select-category/select-category.component';
import {TagModule} from "../tag/tag.module";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, WelcomeComponent, ProfileSettingsComponent, SelectCategoryComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MdModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        TagModule
    ]
})
export class AuthModule { }
