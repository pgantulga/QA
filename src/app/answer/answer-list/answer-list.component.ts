import {Component, Input, OnInit} from '@angular/core';
import {VoteService} from '../../services/vote.service';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input() answer: any;

  constructor(public voteService: VoteService) { }

  ngOnInit(): void {
  }
  addVote() {
    this.voteService.addVote(this.answer).subscribe();
  }

}
