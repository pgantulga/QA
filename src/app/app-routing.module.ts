import { NotFoundComponent } from './not-found/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratorModule } from './moderator/moderator.module';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'posts/:id',
        loadChildren: () => import('./post/post.module').then(m => m.PostModule)
    },
    {
        path: 'articles/:id',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
    },
    {
        path: 'blog',
        loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
    },
    {
        path: 'ask',
        loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'tags',
        loadChildren: () => import('./tag/tag.module').then(m => m.TagModule)
    },
    {
        path: 'users',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'moderator',
        loadChildren: () => import('./moderator/moderator.module').then(m => ModeratorModule)
    },
    { path: '**', redirectTo: '/not-found' },
    {
        path: 'not-found',
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule),
    }
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
