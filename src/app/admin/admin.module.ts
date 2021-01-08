import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin/admin.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import { AdminPostComponent } from './admin-post/admin-post.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminTagComponent } from './admin-tag/admin-tag.component';
import { AdminArticlesComponent } from './admin-articles/admin-articles.component';
import {LayoutModule} from "../layout/layout.module";
import { ArticleViewComponent } from './article-view/article-view.component';
import { ArticleAddComponent } from './article-add/article-add.component';

@NgModule({
    declarations: [AdminComponent, AdminPostComponent, AdminUserComponent, AdminTagComponent, AdminArticlesComponent, ArticleViewComponent, ArticleAddComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MdModule,
        FlexLayoutModule,
        LayoutModule
    ]
})
export class AdminModule {
}
