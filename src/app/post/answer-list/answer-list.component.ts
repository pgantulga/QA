import {Component, Input} from '@angular/core';
import {VoteService} from '../../services/vote.service';
import {AuthService} from "../../services/auth.service";
import {AnswerService} from "../../services/answer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent{
  @Input() answer: any;
  showReply: boolean;
  showReplies: boolean;
  toggleIcon: string;
  replies$: Observable<any>;
  constructor(public authService: AuthService, private answerService: AnswerService) {
    this.showReply = false;
    this.showReplies = false;
    this.toggleIcon = 'keyboard_arrow_down';
  }
  showRepliesToggle() {
    this.showReplies = !this.showReplies;
    this.replies$ = (this.showReplies) ? this.answerService.getReplies(this.answer) : null;
    this.toggleIcon = this.iconChange(this.showReplies);
  }
  reply() {
    this.showReply = !this.showReply;
  };
  iconChange(showReplies) {
    return showReplies ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }
}
