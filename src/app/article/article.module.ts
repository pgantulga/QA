import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from './../layout/layout.module';
import { MdModule } from './../shared/md.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleViewComponent } from './article-view/article-view.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ArticleViewComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MdModule,
    SharedModule,
    LayoutModule,
    FlexLayoutModule
  ]
})
export class ArticleModule { }
