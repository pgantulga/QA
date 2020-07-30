import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {first, map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  votesCollection = this.db.collection<any>('votes');
  constructor(private db: AngularFirestore, private authService: AuthService) { }
  getVotesNumber(answerObj) {
  }
  async addVote(answerObj) {
      const user = await this.authService.getUser();
      return this.votesCollection.add(
          {
              voteGiver: {
                  uid: user.uid,
                  displayName: user.displayName
              },
              voteReceiver: answerObj.author.uid,
              createdAt: new Date(),
              answerId: answerObj.id,
              answerContent: answerObj.content,
              postTitle: answerObj.parent.title,
              postId: answerObj.parent.id,
              voteId: answerObj.parent.id + '_' + answerObj.id + '_' + user.uid
          })
          .then(res => {
              res.update({
                      id: res.id,
                  }
              );
              return true;
          })
          .catch(err => {
              console.log(err);
              return false;
          });
  }
 async removeVote(answerObj) {
        const user = await this.authService.getUser();
        const vote = await this.findVote(answerObj);
        vote.forEach( doc => {
             doc.ref.delete();
        });
  }
  async findVote(answerObj) {
      const user = await this.authService.getUser();
      const voteRef =  this.db.collection('votes',
              ref => ref.where('voteId', '==', answerObj.parent.id + '_' + answerObj.id + '_' + user.uid));
      return voteRef.get().toPromise();
  }
}
