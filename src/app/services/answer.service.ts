import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  answersRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) { }
  getAllAnswer(postId) {
    console.log(postId);
    this.answersRef = this.db.collection('posts').doc(postId).collection('answers', ref => ref.orderBy('createdAt', 'desc'))
    return this.answersRef.valueChanges();
  }
  addAnswer(post, answer, user) {
    this.answersRef = this.db.collection('posts').doc(post.id).collection('answers', ref => ref.orderBy('createdAt', 'desc'));
    return this.answersRef.add({
      content: answer.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
      },
      parent: {
        id: post.id,
        title: post.title
      },
    })
        .then(res => {
          console.log(res);
          return res.update({id: res.id});
        })
        .catch(err => {
          console.log('Error occurred: ' + err);
        });
  }
}
