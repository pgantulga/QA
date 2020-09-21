import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MdModule} from '../shared/md.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidePostDirComponent } from './side-post-dir/side-post-dir.component';
import {PostSidenavComponent} from './post-sidenav/post-sidenav.component';
import {PostListSidenavComponent} from './post-list-sidenav/post-list-sidenav.component';
import {SharedModule} from '../shared/shared.module';
import {DetailHeaderComponent} from './detail-header/detail-header.component';
import {TopBannerComponent} from './top-banner/top-banner.component';
import {FooterComponent} from './footer/footer.component';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {UserProfileLargeComponent} from './user-profile-large/user-profile-large.component';


@NgModule({
  declarations: [
      NavbarComponent,
    SidebarComponent,
    SidenavComponent,
    SidePostDirComponent,
    PostListSidenavComponent,
    PostSidenavComponent,
    DetailHeaderComponent,
    ProfileHeaderComponent,
    TopBannerComponent,
    FooterComponent,
    UserProfileLargeComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SidenavComponent,
      SidePostDirComponent,
      SharedModule,
      PostSidenavComponent,
      DetailHeaderComponent,
      ProfileHeaderComponent,
      TopBannerComponent,
      FooterComponent,
      UserProfileLargeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
      MdModule,
      FlexLayoutModule
  ]
})
export class LayoutModule { }