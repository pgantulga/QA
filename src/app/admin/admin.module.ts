import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminTagComponent } from './admin-tag/admin-tag.component';


@NgModule({
    declarations: [AdminComponent, AdminPostComponent, AdminUserComponent, AdminTagComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MdModule,
        FlexLayoutModule]
})
export class AdminModule {
}
