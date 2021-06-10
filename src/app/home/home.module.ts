import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {PostListComponent} from '../post/post-list/post-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdModule} from '../shared/md.module';
import {PostListGhostComponent} from '../post/post-list-ghost/post-list-ghost.component';
import {MomentPipe} from '../shared/moment.pipe';
import {SharedModule} from '../shared/shared.module';
import {TagModule} from '../tag/tag.module';
import {LayoutModule} from '../layout/layout.module';


@NgModule({
  declarations: [HomeComponent, PostListComponent, PostListGhostComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MdModule,
        FlexLayoutModule,
        SharedModule,
        LayoutModule
    ],
  exports: [
    PostListComponent,
    PostListGhostComponent,
  ]
})
export class HomeModule { }
