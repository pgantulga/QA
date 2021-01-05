import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminPostComponent} from './admin-post/admin-post.component';
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {AdminGuard} from "../services/auth-guard.service";
import {AdminTagComponent} from "./admin-tag/admin-tag.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    // canActivateChild: [AdminGuard],
    children: [
      {
        path: 'posts',
        component: AdminPostComponent
      },
      {
        path: 'users',
        component: AdminUserComponent
      },
      {
        path: 'tags',
        component: AdminTagComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }