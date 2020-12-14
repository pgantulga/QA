import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {first, map, switchMap, take} from 'rxjs/operators';
import {PostService} from './post.service';
// import increment = firebase.database.ServerValue.increment;

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  votesCollection = this.db.collection<any>('votes');
  constructor(private db: AngularFirestore, private authService: AuthService, private postService: PostService) { }
  async addVote(obj) {
      const user = await this.authService.getUser();
      return this.votesCollection.add(
          {
              voteGiver: {
                  uid: user.uid,
                  displayName: user.displayName
              },
              voteReceiver: obj.author.uid,
              createdAt: new Date(),
              answerId: obj.id,
              answerContent: obj.content,
              postTitle: obj.parent.title,
              postId: obj.parent.id,
              voteId: obj.parent.id + '_' + obj.id + '_' + user.uid
          })
          .then(res => {
              this.postService.addLog(user, 'voted', obj.parent.id);
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
             doc.ref.delete()
                 .then(() => {
                     this.postService.addLog(user, 'devoted', answerObj.parent.id);
                 });
        });
  }
  async findVote(answerObj) {
      const user = await this.authService.getUser();
      if (!user ) {
          return null;
      }
      const voteRef =  this.db.collection('votes',
          ref => ref.where('voteId', '==', answerObj.parent.id + '_' + answerObj.id + '_' + user.uid));
      return voteRef.get().toPromise();
  }
}
