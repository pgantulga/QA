import {Component, Input} from '@angular/core';
import {VoteService} from '../../services/vote.service';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent{
  @Input() answer: any;
  constructor() { }
}
