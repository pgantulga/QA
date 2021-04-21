import { ModeratorOverviewComponent } from './moderator-overview/moderator-overview.component';
import { ModeratorCompanyComponent } from './moderator-company/moderator-company.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ModeratorComponent} from './moderator/moderator.component';
import {ModeratorUserComponent} from './moderator-user/moderator-user.component';
import {ModeratorTagsComponent} from './moderator-tags/moderator-tags.component';
import {ModeratorPostsComponent} from './moderator-posts/moderator-posts.component';
import {ModeratorGuard} from "./moderator-guard.service";


const routes: Routes = [
    {
        path: '',
        component: ModeratorComponent,
        canActivate: [ModeratorGuard],
        children: [
            {
                path: 'overview',
                component: ModeratorOverviewComponent
            },
            {
                path: 'posts',
                component: ModeratorPostsComponent
            },
            {
                path: 'users',
                component: ModeratorUserComponent
            },
            {
                path: 'tags',
                component: ModeratorTagsComponent
            },
            {
                path: 'companies',
                component: ModeratorCompanyComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeratorRoutingModule {
}
