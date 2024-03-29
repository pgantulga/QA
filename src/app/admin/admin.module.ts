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
import {QuillModule} from "ngx-quill";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AdminCategoryAddComponent } from './admin-category-add/admin-category-add.component';
import {CreateModule} from '../create/create.module';
import {TagModule} from '../tag/tag.module';

@NgModule({
    declarations: [AdminComponent, AdminPostComponent, AdminUserComponent, AdminTagComponent, AdminArticlesComponent, ArticleViewComponent, ArticleAddComponent, AdminCategoryAddComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MdModule,
        FlexLayoutModule,
        LayoutModule,
        // QuillModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        TagModule,
        CreateModule
    ]
})
export class AdminModule {
}
