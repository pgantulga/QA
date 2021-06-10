import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { TagModule } from './../tag/tag.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModeratorRoutingModule} from './moderator-routing.module';
import {ModeratorComponent} from './moderator/moderator.component';
import {ModeratorUserComponent} from './moderator-user/moderator-user.component';
import {ModeratorTagsComponent} from './moderator-tags/moderator-tags.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ModeratorPostsComponent } from './moderator-posts/moderator-posts.component';
import { ModeratorCompanyComponent } from './moderator-company/moderator-company.component';
import { CompanyAddComponent } from './moderator-company/company-add/company-add.component';
import { ModeratorOverviewComponent } from './moderator-overview/moderator-overview.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import { ModeratorBannerComponent } from './moderator-banner/moderator-banner.component';
import { BannerAddComponent } from './moderator-banner/banner-add/banner-add.component';


@NgModule({
    declarations: [ModeratorComponent, ModeratorUserComponent, ModeratorTagsComponent, ModeratorPostsComponent, ModeratorCompanyComponent, CompanyAddComponent, ModeratorOverviewComponent, OverviewCardComponent, ModeratorBannerComponent, BannerAddComponent],
    imports: [
        CommonModule,
        ModeratorRoutingModule,
        MdModule,
        FlexLayoutModule,
        TagModule,
        SharedModule,
        FormsModule
    ]
})
export class ModeratorModule {
}
