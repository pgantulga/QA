import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {MdComponentsComponent} from './admin/md-components/md-components.component';
// import {HomeComponent} from './home/home.component';
// import {PostDetailComponent} from './post/post-detail/post-detail.component';
// import {UsersComponent} from './user/users/users.component';
// import {UserDetailComponent} from './user/user-detail/user-detail.component';
// import {LoginComponent} from './login/login.component';
// import {RegisterComponent} from './register/register.component';
// import {PostAddComponent} from './post/post-add/post-add.component';
// import {AdminComponent} from './admin/admin/admin.component';
// import {AdminGuard} from './services/auth-guard.service';
// import {TagsComponent} from './tag/tags/tags.component';
// import {TagAddComponent} from './tag/tag-add/tag-add.component';
// import {TagDetailComponent} from './tag/tag-detail/tag-detail.component';
// import {LayoutOneComponent} from './shared/templates/layout-one/layout-one.component';
// import {LayoutTwoComponent} from './shared/templates/layout-two/layout-two.component';
// import {LayoutThreeComponent} from './shared/templates/layout-three/layout-three.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'posts/:id',
    loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  },
  {
    path: 'ask',
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

  // {
  //   path: 'posts/:id',
  //   component: LayoutTwoComponent,
  //   children: [
  //     { path: '', component: PostDetailComponent}
  //   ]
  // },
  // {
  //   path: 'users',
  //   component: LayoutOneComponent,
  //   children: [
  //     { path: '', component: UsersComponent}
  //   ]
  // },
  // {
  //   path: 'users/:uid',
  //   component: LayoutOneComponent,
  //   children: [
  //     {path: '', component: UserDetailComponent}
  //   ]
  // },
  // {
  //   path: 'login',
  //   component: LayoutThreeComponent,
  //   children: [
  //     {path: '', component: LoginComponent}
  //   ]
  // },
  // {
  //   path: 'Register',
  //   component: LayoutThreeComponent,
  //   children: [
  //     {path: '', component: RegisterComponent}
  //   ]
  // },
  // {
  //   path: 'Ask',
  //   component: LayoutOneComponent,
  //   children: [
  //     {path: '', component: PostAddComponent}
  //   ]
  // },
  // {
  //   path: 'posts/:id/edit',
  //   component: LayoutOneComponent,
  //   children: [
  //     {path: '', component: PostAddComponent}
  //   ]
  // },
  // {
  //   path: 'tags',
  //   component: LayoutOneComponent,
  //   children: [
  //     {path: '', component: TagsComponent}
  //   ]
  // },
  // {
  //   path: 'tagDetail/:tagId',
  //   component: LayoutOneComponent,
  //   children: [
  //     {path: '', component: TagDetailComponent}
  //   ]
  // },
  // {path: 'addTag', component: TagAddComponent},
  // {path: 'tagDetail/:tagId', component: TagDetailComponent},

];
@NgModule({
  declarations: [
  ],
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
