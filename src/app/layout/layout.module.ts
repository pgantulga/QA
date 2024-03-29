import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MdModule} from '../shared/md.module';
import {SidenavComponent} from './sidenav/sidenav.component';
import {SidePostDirComponent} from './side-post-dir/side-post-dir.component';
import {PostSidenavComponent} from './post-sidenav/post-sidenav.component';
import {PostListSidenavComponent} from './post-list-sidenav/post-list-sidenav.component';
import {SharedModule} from '../shared/shared.module';
import {DetailHeaderComponent} from './detail-header/detail-header.component';
import {TopBannerComponent} from './top-banner/top-banner.component';
import {FooterComponent} from './footer/footer.component';
import {ProfileHeaderComponent} from './profile-header/profile-header.component';
import {UserProfileLargeComponent} from './user-profile-large/user-profile-large.component';
import {SidebarProfileComponent} from './sidebar-profile/sidebar-profile.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {WarnComponent} from './warn/warn.component';
import {ArticleListComponent} from './article-list/article-list.component';
import { TopWrapperComponent } from './top-wrapper/top-wrapper.component';
import {TagChipComponent} from '../tag/tag-chip/tag-chip.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { InfoComponent } from './info/info.component';
import { LoginWarnComponent } from './login-warn/login-warn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { BannerHorizonComponent} from './banner-horizon/banner-horizon.component'


@NgModule({
    declarations: [
        NavbarComponent,
        SidebarComponent,
        SidebarProfileComponent,
        SidenavComponent,
        SidePostDirComponent,
        PostListSidenavComponent,
        PostSidenavComponent,
        DetailHeaderComponent,
        ProfileHeaderComponent,
        TopBannerComponent,
        FooterComponent,
        UserProfileLargeComponent,
        SidebarProfileComponent,
        WarnComponent,
        ArticleListComponent,
        TopWrapperComponent,
        TagChipComponent,
        InfoComponent,
        BannerHorizonComponent,
        LoginWarnComponent,
    ],
    exports: [
        NavbarComponent,
        SidebarComponent,
        SidebarProfileComponent,
        SidenavComponent,
        SidePostDirComponent,
        PostSidenavComponent,
        DetailHeaderComponent,
        ProfileHeaderComponent,
        TopBannerComponent,
        FooterComponent,
        UserProfileLargeComponent,
        ArticleListComponent,
        TopWrapperComponent,
        WarnComponent,
        InfoComponent,
        TagChipComponent,
        LoginWarnComponent,
        BannerHorizonComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MdModule,
        FlexLayoutModule,
        SharedModule,
        MatSlideToggleModule,
        ScrollingModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
    ]
})
export class LayoutModule {
}
