import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { MdComponentsComponent } from './admin/md-components/md-components.component';
import { AngularFireModule} from '@angular/fire';
import { environment} from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { AdminGuard} from './services/auth-guard.service';
import { AdminComponent } from './admin/admin/admin.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { PostAddComponent } from './post/post-add/post-add.component';
import { ReactiveFormsModule} from '@angular/forms';
import { QuillModule} from 'ngx-quill';
import { SnackComponent } from './shared/components/snack/snack.component';
import { MdModule} from './modules/md.module';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { MomentPipe } from './shared/moment.pipe';
import { CommentAddComponent } from './comment/comment-add/comment-add.component';
import { AnswerAddComponent } from './answer/answer-add/answer-add.component';
import { AnswerListComponent } from './answer/answer-list/answer-list.component';
import { VoteButtonComponent } from './vote/vote-button/vote-button.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { ShellComponent } from './shared/shell/shell.component';
import {MatTableModule} from '@angular/material/table';
import { TagAddComponent } from './tag/tag-add/tag-add.component';
import { TagsComponent } from './tag/tags/tags.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PostSidenavComponent } from './shared/components/post-sidenav/post-sidenav.component';
import { PostListSidenavComponent } from './shared/components/post-list-sidenav/post-list-sidenav.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    MdComponentsComponent,
    LoginComponent,
    DialogComponent,
    AdminComponent,
    HeaderComponent,
    PostListComponent,
    PostAddComponent,
    SnackComponent,
    PostDetailComponent,
    MomentPipe,
    CommentAddComponent,
    AnswerAddComponent,
    AnswerListComponent,
    VoteButtonComponent,
    UserProfileComponent,
    ShellComponent,
    TagAddComponent,
    TagsComponent,
    SidebarComponent,
    PostSidenavComponent,
    PostListSidenavComponent
  ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([
            {path: 'components', component: MdComponentsComponent},
            {path: 'home', component: HomeComponent},
            {path: 'posts/:id', component: PostDetailComponent},
            {path: 'users', component: UsersComponent},
            {path: 'login', component: LoginComponent},
            {path: 'ask', component: PostAddComponent},
            {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
            {path: 'tags', component: TagsComponent},
            {path: 'addTag', component: TagAddComponent},
            {path: '**', redirectTo: '/home', pathMatch: 'full'},
        ]),
        MdModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        MatTableModule,
        MatSelectModule,
    ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
