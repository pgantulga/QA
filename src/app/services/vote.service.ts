import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase';
import { first, map, switchMap, take } from 'rxjs/operators';
import { PostService } from './post.service';
import { Observable } from 'rxjs/internal/Observable';

export const BeerIcons = [
  {
    name: 'beer_break',
    url: '../../../assets/beer_icon/beer_break.svg'
  },
  {
    name: 'beer_0',
    url: '../../../assets/beer_icon/beer_0.svg',
  },
  {
    name: 'beer_1',
    url: '../../../assets/beer_icon/beer_1.svg',
  },
  {
    name: 'beer_2',
    url: '../../../assets/beer_icon/beer_2.svg',
  },
  {
    name: 'beer_3',
    url: '../../../assets/beer_icon/beer_3.svg',
  },
  {
    name: 'beer_4',
    url: '../../../assets/beer_icon/beer_4.svg',
  },
  {
    name: 'beer_cheers',
    url: '../../../assets/beer_icon/beer_cheers.svg',
  },
];

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  votesCollection = this.db.collection<any>('votes');
  upVotesCollection = this.db.collection<any>('upVotes');
  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private postService: PostService
  ) { }

  getItemVotes(item: any, type?: string): Observable<any> {
    return type === 'answer'
      ? this.upVotesCollection
        .doc(item.parent.id + '_' + item.id)
        .valueChanges()
      : this.upVotesCollection.doc(item.id).valueChanges();
  }

  updateVote(item, user, value, type?) {
    const data = {};
    data[user.uid] = value;
    const ref =
      type === 'answer'
        ? this.upVotesCollection.doc(item.parent.id + '_' + item.id)
        : this.upVotesCollection.doc(item.id);
    return ref.set(data, { merge: true }).then((res) => {
      let message: string;
      const id = (type === 'answer') ? item.parent.id : item.id;
      if (value === 1) {
        message = 'voted'
      }
      if (value === 0) {
        message = 'devoted'
      }
      if (value === -1) {
        message = 'downvoted'
      }
      this.postService.addLog(user, message, id)
    })
      .catch(err => {
        console.log(err)
      })
  }
}
