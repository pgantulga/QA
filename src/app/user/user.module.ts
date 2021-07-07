import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from './users/users.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {PostListComponent} from '../post/post-list/post-list.component';
import {PostListGhostComponent} from '../post/post-list-ghost/post-list-ghost.component';
import {HomeModule} from '../home/home.module';
import {PostModule} from '../post/post.module';
import {LayoutModule} from '../layout/layout.module';
import { ScoreCardComponent } from './score-card/score-card.component';


@NgModule({
  declarations: [UsersComponent, UserDetailComponent, ScoreCardComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        MdModule,
        FlexLayoutModule,
        HomeModule,
        PostModule,
        LayoutModule
    ]
})
export class UserModule { }
