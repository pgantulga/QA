import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from './post-header/header.component';
import {AnswerListComponent} from './answer-list/answer-list.component';
import {VoteButtonComponent} from './vote-button/vote-button.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AnswerAddComponent} from './answer-add/answer-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillModule} from 'ngx-quill';
import { ReplyAddComponent } from './reply-add/reply-add.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import {HomeModule} from '../home/home.module';
import { NgSelectedTextTooltipModule } from 'ng-selected-text-tooltip';
import {LayoutModule} from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { AnswerBottomSheetComponent } from './answer-bottom-sheet/answer-bottom-sheet.component';
import { PostLogsComponent } from './post-logs/post-logs.component';


@NgModule({
  declarations: [
    PostDetailComponent,
    HeaderComponent,
    AnswerListComponent,
    VoteButtonComponent,
    UserProfileComponent,
    AnswerAddComponent,
    ReplyAddComponent,
    ReplyListComponent,
    AnswerBottomSheetComponent,
    PostLogsComponent],
    imports: [
        CommonModule,
        NgSelectedTextTooltipModule,
        PostRoutingModule,
        MdModule,
        FlexLayoutModule,
        SharedModule, 
        ReactiveFormsModule,
        QuillModule.forRoot(),
        FormsModule,
        HomeModule,
        LayoutModule,
        MatIconModule,
        HttpClientModule
    ],
  exports: [
    VoteButtonComponent,
    HeaderComponent,
    UserProfileComponent,

  ]
})
export class PostModule { }
