import { MdModule } from './../shared/md.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagRoutingModule } from './tag-routing.module';
import { TagsComponent } from './tags/tags.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagItemComponent } from './tag-item/tag-item.component';
import { TagAddComponent } from './tag-add/tag-add.component';
import { TagDetailComponent } from './tag-detail/tag-detail.component';
import { TagUpdateComponent } from './tag-update/tag-update.component';
import { PostModule } from '../post/post.module';
import { HomeModule } from '../home/home.module';
import { LayoutModule } from '../layout/layout.module';
import { TagCategoryListComponent } from './tag-category-list/tag-category-list.component';
import { TagChipComponent } from './tag-chip/tag-chip.component';
import { TagsHeaderComponent } from './tags-header/tags-header.component';
// import {PostListComponent} from '../post/post-list/post-list.component';
// import {PostListGhostComponent} from '../post/post-list-ghost/post-list-ghost.component';


@NgModule({
  declarations: [
    TagsComponent,
    TagItemComponent,
    TagAddComponent,
    TagDetailComponent,
    TagUpdateComponent,
    TagCategoryListComponent,
    TagsHeaderComponent
  ],
  exports: [
    TagCategoryListComponent,
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    MdModule,
    FlexLayoutModule,
    PostModule,
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
    LayoutModule,
  ]
})
export class TagModule { }
