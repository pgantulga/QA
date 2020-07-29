import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {map, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  votesCollection = this.db.collection<any>('votes');
  constructor(private db: AngularFirestore, private authService: AuthService) { }

  addVote(answerObj) {
    console.log(answerObj);
    return this.authService.user$.pipe(
        take(1),
        map(user => {
          console.log(user);
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
              }
          ).then(res => res.update( {
            id: res.id
          }));
        }));
  }
}
