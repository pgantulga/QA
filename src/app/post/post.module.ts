import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {MdModule} from '../modules/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {HeaderComponent} from '../shared/headers/post-header/header.component';
import {AnswerListComponent} from '../answer/answer-list/answer-list.component';
import {VoteButtonComponent} from '../vote/vote-button/vote-button.component';
import {UserProfileComponent} from '../shared/components/user-profile/user-profile.component';
import {AnswerAddComponent} from '../answer/answer-add/answer-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [PostDetailComponent, HeaderComponent, AnswerListComponent, VoteButtonComponent, UserProfileComponent, AnswerAddComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
      MdModule,
      FlexLayoutModule,
      SharedModule,
    ReactiveFormsModule,
      QuillModule.forRoot(),
      FormsModule
  ],
  exports: []
})
export class PostModule { }
