import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection = this.db.collection<any>('posts', ref => ref.orderBy('createdAt', 'desc'));
  postMetaDoc = this.db.doc('metas/post');
  constructor(private db: AngularFirestore) { }
  nextPage(doc, sort) {
    return this.db.collection<any>('posts', ref => ref.orderBy(sort, 'desc').startAfter(doc).limit(10)).get();
  }
  prevPage(doc, sort) {
    return this.db.collection<any>('posts', ref => ref.orderBy(sort, 'desc').endBefore(doc).limitToLast(10)).get();
  }
  getFirstItems(num, sort) {
    return this.db.collection('posts', ref => ref.limit(num).orderBy(sort, 'desc')).get();
  }
  getFirstItemsSync(num, sort) {
    return this.db.collection('posts', ref => ref.limit(num).orderBy(sort, 'desc')).valueChanges();
  }
  getPost(id) {
    return this.postCollection.doc(id).valueChanges();
  }
  getAllPosts() {
    return this.db.collection('posts', ref => ref.orderBy('updatedAt', 'desc')).get();
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
    switch (sort) {
      case 'latest':
        return this.db.collection<any>('posts', ref => ref.orderBy('updatedAt', 'desc'));
      case 'active':
        return this.db.collection<any>('posts', ref => ref.orderBy('answersCount', 'desc'));
    }
  }
  // tests
  addTestPosts(num) {
    for ( let i = 0; i < num; i++) {
       // @ts-ignore
      // this.addOperation(i).then(d => { console.log(d); });
      setTimeout(() => { this.addOperation(i).then(res => {
        console.log('added ' + i);
      });
      }, i * 3000);
    }
  }
  async addOperation(i) {
    await this.postCollection.add({
      title: 'this is test post' + i,
      content: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
      createdAt: new Date(),
      author: {
        displayName: 'Test name',
        uid: 'testUid',
      },
      updatedAt: new Date(),
      answersCount: 0,
      totalVotes: 0,
      viewCount: 0
    }).then(res => {
      this.addLog({
        displayName: 'Test name',
        uid: 'testUid',
      }, 'created', res.id );
      return res.update({
        id: res.id
      });
    });
    return i;
  }
  delay(i) {
    setTimeout(() => {
      console.log(i);
    }, 3000);
  }
}
