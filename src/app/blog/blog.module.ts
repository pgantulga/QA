import { PostModule } from './../post/post.module';
import { TagModule } from './../tag/tag.module';
import { HomeModule } from './../home/home.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './../layout/layout.module';
import { SharedModule } from './../shared/shared.module';
import { MdModule } from './../shared/md.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CreateModule } from '../create/create.module';
import { PublisherProfileComponent } from './publisher-profile/publisher-profile.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


@NgModule({
  declarations: [BlogComponent, BlogListComponent, BlogAddComponent, PublisherProfileComponent, BlogDetailComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MdModule,
    SharedModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    CreateModule,
    PostModule

  ]
})
export class BlogModule { }
