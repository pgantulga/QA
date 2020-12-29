import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {PostService} from './post.service';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  answersRef: AngularFirestoreCollection<any>;
  repliesRef: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore, private postService: PostService) { }
  getAllAnswer(postId, sort) {
    this.answersRef = this.db.collection('posts').doc(postId).collection('answers', ref => ref.orderBy(sort.sort, 'desc'));
    return this.answersRef.valueChanges();
  }
  addAnswer(post, answer, user) {
    this.answersRef = this.db.collection('posts').doc(post.id).collection('answers', ref => ref.orderBy('createdAt', 'desc'));
    return this.answersRef.add({
      content: answer.content,
      votesNumber: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
        profilePic: ''
      },
      parent: {
        id: post.id,
        title: post.title
      },
    })
        .then(res => {
          this.postService.addLog( user, 'answered', post.id);
          return res.update({id: res.id});
        })
        .catch(err => {
          console.log('Error occurred: ' + err);
        });
  }
  getReplies(answer) {
    console.log(answer);
    return this.db.collection('posts/' + answer.parent.id + '/answers/' + answer.id + '/replies', ref => ref.orderBy('createdAt', 'desc'))
        .valueChanges();
  }
  addReply(post, answer, reply, user) {
    this.repliesRef = this.db.collection('posts').doc(post.id)
        .collection('answers').doc(answer.id)
        .collection('replies', ref => ref.orderBy('createdAt', 'desc'));
    return this.repliesRef.add({
      content: reply.content,
      createdAt: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
        profilePic: ''
      },
      parentPost: {
        id: post.id,
        title: post.title
      },
      parentAnswer: {
        id: answer.id,
        content: answer.content
      },
      updatedAt: new Date()
    }).then(res => {
      this.postService.addLog(user, 'replied', post.id );
      return res.update({res: res.id});
    }).catch(err => {
      console.log('Error occured:' +  err);
    });
  }
}
