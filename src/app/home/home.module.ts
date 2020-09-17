import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {PostListComponent} from '../post/post-list/post-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdModule} from '../shared/md.module';
// import {MatButtonModule} from '@angular/material/button';
// import {MatMenuModule} from '@angular/material/menu';
// import {AppModule} from '../app.module';
// import {MatDividerModule} from '@angular/material/divider';
import {PostListGhostComponent} from '../post/post-list-ghost/post-list-ghost.component';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatIconModule} from '@angular/material/icon';
// import {SidebarComponent} from '../layout/sidebar/sidebar.component';
import {MomentPipe} from '../shared/moment.pipe';
import {SharedModule} from '../shared/shared.module';
import {PostSidenavComponent} from "../shared/components/post-sidenav/post-sidenav.component";


@NgModule({
  declarations: [HomeComponent, PostListComponent, PostListGhostComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MdModule,
    FlexLayoutModule,
      SharedModule
  ],
  exports: [
    PostListComponent,
    PostListGhostComponent,
  ]
})
export class HomeModule { }
