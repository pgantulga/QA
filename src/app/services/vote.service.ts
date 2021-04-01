import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';
import {first, map, switchMap, take} from 'rxjs/operators';
import {PostService} from './post.service';
import { Observable } from 'rxjs/internal/Observable';
// import increment = firebase.database.ServerValue.increment;

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  votesCollection = this.db.collection<any>('votes');
  upVotesCollection = this.db.collection<any>('upVotes');
  constructor(private db: AngularFirestore, private authService: AuthService, private postService: PostService) { }
  async addVote(obj, type) {
      const user = await this.authService.getUser();
      const data = {
          voteGiver: {
              uid: user.uid,
              displayName: user.displayName
          },
          voteReceiver: obj.author.uid,
          createdAt: new Date(),
          type,
          answerId: (type === 'answer') ? obj.id : null,
          answerContent: (type === 'answer') ? obj.content : null,
          postTitle: (type === 'answer') ? obj.parent.title : obj.title,
          postId: (type === 'answer') ? obj.parent.id : obj.id,
          voteId: (type === 'answer') ? ( obj.parent.id + '_' + obj.id + '_' + user.uid )  : ( obj.id + '_' + user.uid )
      };
      return this.votesCollection.add(data)
          .then(res => {
              this.postService.addLog(user, 'voted', data.postId);
              this.postService.followPost({id: data.postId}, user);
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
 async removeVote(obj, type) {
        const user = await this.authService.getUser();
        const vote = await this.findVote(obj, type);
        vote.forEach( doc => {
             doc.ref.delete()
                 .then(() => {
                     (type === 'answer') ? this.postService.addLog(user, 'devoted', obj.parent.id)
                         : this.postService.addLog(user, 'devoted', obj.id);
                 });
        });
  }
  async findVote(obj, type) {
      const user = await this.authService.getUser();
      if (!user ) {
          return null;
      }
      const voteRef =  (type === 'answer') ? this.db.collection('votes',
          ref => ref.where('voteId', '==', obj.parent.id + '_' + obj.id + '_' + user.uid))
          : this.db.collection('votes',
              ref => ref.where('voteId', '==', obj.id + '_' + user.uid));
      return voteRef.get().toPromise();
  }

  getItemVotes(itemId: string): Observable<any> {
    return this.upVotesCollection.doc(itemId).valueChanges();
  }

  updateVote(itemId, userId, value) {
      const data = {};
      data[userId] = value;
      this.upVotesCollection.doc(itemId).set(data, {merge: true})
        .then(res => {
            console.log(res);
        })
  }


}
