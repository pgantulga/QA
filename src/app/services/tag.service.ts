import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {query} from '@angular/animations';
import {first, map, take} from 'rxjs/operators';
import {snapshotChanges} from '@angular/fire/database';
import {AuthService} from './auth.service';

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

    constructor(private db: AngularFirestore, private authService: AuthService) {
    }

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
            if (formData.allUserFollowed) {
              this.allUsersFollow(res.id)
            }
            return res.update({
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

    allUsersFollow(tagId) {
        const tags = {};
        tags[tagId] = true;
        const users = this.db.collection('users');
        users.get().pipe(
            map(snapshot => {
              const items = [];
              snapshot.docs.map(a => {
                const data = a.data();
                const id = a.id;
                items.push({ id, ...data })
              })
              return items;
            })
        ).subscribe(items => {
          items.forEach(user => {
            this.authService.updateUserInstant(
                { tags: {
                  [tagId]: true
                  }}, user.uid);
          })
        });


    }
}
