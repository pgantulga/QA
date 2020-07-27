import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";



@Injectable({
  providedIn: 'root'
})
export class PostService {
  postCollection = this.db.collection<any>('posts');

  constructor(private db: AngularFirestore) { }
  getPost(id) {
    return this.postCollection.doc(id).valueChanges();
  }

  getAllPosts () {
    return this.postCollection.valueChanges();
  }

  createPost(formData, user) {
    return  this.postCollection.add({
      title: formData.title,
      content: formData.content,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      author: {
        displayName: user.displayName,
        uid: user.uid,
      },
      isOpen: true,
      isParent: true,
      answersCount: 0,
      recommendsCount: 0
    }).then( res => {
      console.log(res.id);
      return res.update({
        id: res.id
      });
    })
        .catch( error => {
          console.log('something happened' + error);
        });
  }
}
