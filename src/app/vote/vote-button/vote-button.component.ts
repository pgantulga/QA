import {Component, Input, OnInit,} from '@angular/core';
import {VoteService} from '../../services/vote.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../../shared/components/snack/snack.component';

@Component({
  selector: 'vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit  {
  @Input() answer: any;
  isVoted: boolean;
  constructor( public voteService: VoteService,
               public snackBar: MatSnackBar
               ) {}
  ngOnInit(): void {
    this.voteService.findVote(this.answer).then(data => {
      if (data) {
        data.forEach(doc => {
          this.isVoted = doc.exists;
        });
      } else  {
        console.log('No user');
      }
    });
  }
  onClick() {
    if (!this.isVoted) {
      this.addVote().then(res => {
        // @ts-ignore
        if (res) {
          this.answer.votesNumber ++; this.isVoted = !this.isVoted;
        } else {
          return null;
        }
      });
    } else {
      this.removeVote()
          .then(() => {
            this.isVoted = !this.isVoted; this.answer.votesNumber --;
          });
    }
  }
  addVote() {
    console.log('add');
    return this.voteService.addVote(this.answer)
        .then(() => {
          this.snackBar.openFromComponent(SnackComponent, {
            data: 'Таны үнэлгээ нэмэгдлээ'
          });
        });
  }
  removeVote(){
    return this.voteService.removeVote(this.answer)
        .then(() => {
          this.snackBar.openFromComponent(SnackComponent, {
            data: 'Таны үнэлгээ хасагдлаа'
          });
        });
  }
}
