import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogCollection = this.db.collection<any>('blogs', ref => ref.orderBy('createdAt', 'desc'));
  constructor(private db: AngularFirestore) { }

  getBlog(id) {
    return this.blogCollection.doc(id).valueChanges();
  }
  getAllBlogs() {
    return this.blogCollection.valueChanges();
  }
  addBlog(formData, user, tagsArray, publishAs) {
    const data = {
      title: formData.title,
      content: formData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishAs,
      author: {
        displayName: user.displayName,
        uid: user.uid
      },
      totalVotes: 0,
      viewCount: 0,
      tags: tagsArray
    };
    return this.blogCollection.add(data).then(res => {
      return res.update( {
        id: res.id,
        updatedAt: new Date()
      });
    })
    .catch(err => {
      console.log('error: ' + err);
    });
  }
  saveBlog(formData, tagsArray, oldValue, publishAs) {
    return this.blogCollection.doc(oldValue.id).set({
      title: formData.title,
      content: formData.content,
      publishAs,
      updatedAt: new Date(),
      tags: tagsArray,
    }, {merge: true});
  }
  deleteBlog(blogId) {
    return this.blogCollection.doc(blogId).delete();
  }
}
