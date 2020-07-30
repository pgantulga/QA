import {Component, Input, OnInit,} from '@angular/core';
import {VoteService} from '../../services/vote.service';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit  {
  @Input() answer: any;
  isVoted: boolean;
  constructor( public voteService: VoteService) {}
  ngOnInit(): void {
    this.voteService.findVote(this.answer).then(data => {
      data.forEach(doc => {
        console.log(doc.exists);
        this.isVoted = doc.exists;
      });
    });
  }
  onClick() {
    if (!this.isVoted) {
      this.addVote().then(res => res ? this.isVoted = !this.isVoted : null );
    } else {
      this.removeVote()
          .then(() => this.isVoted = !this.isVoted);
    }
  }
  addVote() {
    console.log('add');
    return this.voteService.addVote(this.answer);
  }
  removeVote(){
    return this.voteService.removeVote(this.answer);
  }
}
