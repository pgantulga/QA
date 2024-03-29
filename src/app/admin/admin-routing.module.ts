import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AdminPostComponent} from './admin-post/admin-post.component';
import {AdminUserComponent} from "./admin-user/admin-user.component";
import {AdminGuard} from './admin-guard.service';
import {AdminTagComponent} from "./admin-tag/admin-tag.component";
import {AdminArticlesComponent} from "./admin-articles/admin-articles.component";
import {ArticleViewComponent} from "./article-view/article-view.component";
import {ArticleAddComponent} from "./article-add/article-add.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    // canActivateChild: [AdminGuard],
    children: [
      {
        path: 'posts',
        component: AdminPostComponent,
        data: {
          name: 'Posts'
        }
      },
      {
        path: 'users',
        component: AdminUserComponent,
      },
      {
        path: 'tagCategories',
        component: AdminTagComponent
      },
      {
        path: 'articles',
        component: AdminArticlesComponent
      },
      {
        path: 'articles/:id',
        component: ArticleAddComponent,
        data: {
          name: 'Article view',
          child: true
        }
      },
      {
        path: 'create-article',
        component: ArticleAddComponent,
        data: {
          name: 'Article create',
          child: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
