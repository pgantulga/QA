import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection = this.db.collection<any>('posts', ref => ref.orderBy('updatedAt', 'desc'));
  constructor(private db: AngularFirestore) { }
  getPost(id) {
    return this.postCollection.doc(id).valueChanges();
  }
  getAllPosts(sort) {
    return this.sort(sort).valueChanges();
    // return this.postCollection.valueChanges();
  }
  createPost(formData, user) {
    return  this.postCollection.add({
      title: formData.title,
      content: formData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
      },
      isOpen: true,
      isParent: true,
      answersCount: 0,
      totalVotes: 0,
      viewCount: 0
    }).then( res => {
      this.addLog(user, 'created', res.id );
      return res.update({
        id: res.id
      });
    })
        .catch( error => {
          console.log('something happened' + error);
        });
  }
  addLog(user, action: string, postId) {
    const types = ['created', 'edited', 'voted', 'devoted', 'answered', 'replied'];
    // const types_mn = ['Нэмсэн', 'Зассан', 'Санал өгсөн', 'Саналаа буцаасан', 'Хариулт өгсөн', 'Хариулсан' ]
    const ref = this.postCollection.doc(postId).collection('logs');
    if (!types.includes(action)) { return null; }
    ref.add({
      user: {
        displayName: user.displayName,
        uid: user.uid
      },
      type: action,
      timestamp: new Date()
    }).then(res => console.log('Log Added'));
  }
  getLogs(postId) {
    return this.postCollection.doc(postId).collection('logs', ref => ref.orderBy('timestamp', 'desc') ).valueChanges();
  }
  sort(sort) {
    switch(sort) {
        case 'latest':
          return this.db.collection<any>('posts', ref => ref.orderBy('updatedAt', 'desc'));
        case 'active':
          return this.db.collection<any>('posts', ref => ref.orderBy('answersCount', 'desc'));
    }
  }
}

