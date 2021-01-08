import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModeratorRoutingModule} from './moderator-routing.module';
import {ModeratorComponent} from './moderator/moderator.component';
import {ModeratorUserComponent} from './moderator-user/moderator-user.component';
import {ModeratorTagsComponent} from './moderator-tags/moderator-tags.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ModeratorPostsComponent } from './moderator-posts/moderator-posts.component';


@NgModule({
    declarations: [ModeratorComponent, ModeratorUserComponent, ModeratorTagsComponent, ModeratorPostsComponent],
    imports: [
        CommonModule,
        ModeratorRoutingModule,
        MdModule,
        FlexLayoutModule
    ]
})
export class ModeratorModule {
}
