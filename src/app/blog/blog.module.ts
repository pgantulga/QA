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


@NgModule({
  declarations: [BlogComponent, BlogListComponent, BlogAddComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MdModule,
    SharedModule,
    LayoutModule,
    FlexLayoutModule
  ]
})
export class BlogModule { }
