import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from './users/users.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserDetailComponent} from './user-detail/user-detail.component';


@NgModule({
  declarations: [UsersComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MdModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
