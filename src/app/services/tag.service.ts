import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

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
  constructor(private db: AngularFirestore) { }
  getAllTags() {
    return this.tagsCollection.valueChanges();
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
}
