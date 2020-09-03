import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, of} from 'rxjs';

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  totalUsed: number;
  createdBy: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tagsCollection = this.db.collection('tags', ref => ref.orderBy('createdAt', 'desc'));
  tagSource = new BehaviorSubject('default');
  currentTag = this.tagSource.asObservable();
  constructor(private db: AngularFirestore) { }
  setCurrentTag(tagId) {
    this.tagSource.next(tagId);
  }
  getAllTags() {
    return this.tagsCollection.valueChanges();
  }
  getPopularTags() {
    return this.db.collection('tags', ref => ref.orderBy('totalUsed', 'desc').limit(10)).valueChanges();
  }
  getTagInfo(id) {
    return this.tagsCollection.doc(id).valueChanges();
  }
  createTag(formData, user) {
    return this.tagsCollection.add({
      name: formData.name,
      createdBy: {
        displayName: user.displayName,
        uid: user.uid
      },
      description: formData.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      totalUsed: 0,
    }).then(res => {
      return res.update( {
        id: res.id
      }
      // log
      );
    });
  }
  updateTag(formData, oldData) {
    return this.tagsCollection.doc(oldData.id).set({
      name: formData.name,
      description: formData.description,
      updatedAt: new Date(),
    }, {merge: true});
  }
}
