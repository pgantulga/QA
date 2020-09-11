import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {Router, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
// import { NavbarComponent } from './layout/navbar/navbar.component';
// import { UsersComponent } from './user/users/users.component';
// import { MdComponentsComponent } from './admin/md-components/md-components.component';
import { AngularFireModule} from '@angular/fire';
import { environment} from '../environments/environment';
// import { LoginComponent } from './login/login.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AdminGuard} from './services/auth-guard.service';
// import { AdminComponent } from './admin/admin/admin.component';
// import { HeaderComponent } from './shared/headers/post-header/header.component';
// import { PostAddComponent } from './post/post-add/post-add.component';
// import {FormsModule} from '@angular/forms';
// import { QuillModule} from 'ngx-quill';
import { SnackComponent } from './shared/components/snack/snack.component';
import { MdModule} from './modules/md.module';
// import { PostDetailComponent } from './post/post-detail/post-detail.component';
// import { MomentPipe } from './shared/moment.pipe';
// import { CommentAddComponent } from './comment/comment-add/comment-add.component';
// import { AnswerAddComponent } from './answer/answer-add/answer-add.component';
// import { AnswerListComponent } from './answer/answer-list/answer-list.component';
// import { VoteButtonComponent } from './vote/vote-button/vote-button.component';
// import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { ShellComponent } from './shared/shell/shell.component';
// import {MatTableModule} from '@angular/material/table';
// import { TagAddComponent } from './tag/tag-add/tag-add.component';
// import { TagsComponent } from './tag/tags/tags.component';
// import { SidebarComponent } from './layout/sidebar/sidebar.component';
// import { PostSidenavComponent } from './shared/components/post-sidenav/post-sidenav.component';
// import { PostListSidenavComponent } from './shared/components/post-list-sidenav/post-list-sidenav.component';
// import {MatSelectModule} from '@angular/material/select';
// import { TagItemComponent } from './tag/tag-item/tag-item.component';
// import {MatGridListModule} from '@angular/material/grid-list';
// import { TopBannerComponent } from './shared/banners/top-banner/top-banner.component';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { FooterComponent } from './shared/components/footer/footer.component';
// import { TagSelectComponent } from './tag/tag-select/tag-select.component';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import { TagDetailComponent } from './tag/tag-detail/tag-detail.component';
// import { DetailHeaderComponent } from './shared/headers/detail-header/detail-header.component';
// import { TagUpdateComponent } from './tag/tag-update/tag-update.component';
// import { RegisterComponent } from './register/register.component';
// import { LayoutOneComponent } from './shared/templates/layout-one/layout-one.component';
// import { LayoutTwoComponent } from './shared/templates/layout-two/layout-two.component';
// import { LayoutThreeComponent } from './shared/templates/layout-three/layout-three.component';
// import { ProfileHeaderComponent } from './shared/headers/profile-header/profile-header.component';
// import { UserDetailComponent } from './user/user-detail/user-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './layout/layout.module';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
    declarations: [
        AppComponent,
        // UsersComponent,
        // MdComponentsComponent,
        // LoginComponent,
        DialogComponent,
        // AdminComponent,
        // HeaderComponent,
        // PostAddComponent,
        SnackComponent,
        // PostDetailComponent,
        // CommentAddComponent,
        // AnswerAddComponent,
        // AnswerListComponent,
        // VoteButtonComponent,
        // UserProfileComponent,
        ShellComponent,
        // TagAddComponent,
        // TagsComponent,
        // PostSidenavComponent,
        // PostListSidenavComponent,
        // TagItemComponent,
        // TopBannerComponent,
        // FooterComponent,
        // TagSelectComponent,
        // TagDetailComponent,
        // DetailHeaderComponent,
        // PostListGhostComponent,
        // TagUpdateComponent,
        // RegisterComponent,
        // LayoutOneComponent,
        // LayoutTwoComponent,
        // LayoutThreeComponent,
        // ProfileHeaderComponent,
        // UserDetailComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AppRoutingModule,
        LayoutModule,
        MatSnackBarModule,
        MatSidenavModule,
        MdModule,
        FlexLayoutModule,
        // ReactiveFormsModule,
        // QuillModule.forRoot(),
        // MatTableModule,
        // MatSelectModule,
        // MatGridListModule,
        // MatPaginatorModule,
        // MatProgressSpinnerModule,
        // MatAutocompleteModule,
    ],
    providers: [AdminGuard],
    exports: [
        // MomentPipe,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
