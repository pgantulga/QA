import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentsRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) { }
  addComment(postId, comment, user) {
    this.commentsRef = this.db.collection('posts').doc(postId).collection('comments', ref => ref.orderBy('createdAt', 'desc'));
    return this.commentsRef.add({
      content: comment.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
      },
      parentId: postId
    })
        .then(res => {
          console.log(res);
          return res.update({id: res.id});
        })
        .catch(err => {
          console.log('Error occured: ' + err);
        });
  }
}
