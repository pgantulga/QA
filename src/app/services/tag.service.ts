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
                // this.allUsersFollow(res.id)
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

    followTag(user, tag) {
        return this.tagsCollection.doc(tag.id).collection('followers').add({uid: user.uid});
    }

    unfollowTag(user, tag) {
        return this.findFollower(user, tag)
            .subscribe(followers => {
                if (followers.size > 0) {
                    followers.forEach(item => {
                        return this.tagsCollection.doc(tag.id).collection('followers').doc(item.id).delete();
                    });
                }
            });
    }

    getFollowers(tag) {
        return this.tagsCollection.doc(tag.id).collection('followers').valueChanges();
    }

    createTagCategory(data) {
        return this.db.collection('tagCategories').add({
            name: data.name,
            description: data.description,
            image: data.image,
            tags: data.tags,
            color: data.color
        })
            .then(res => {
                res.update({
                    id: res.id
                });
            });
    }

    updateTagCategory(formData, oldData) {
        return this.db.collection('tagCategories').doc(oldData.id)
            .set({
                id: oldData.id,
                name: formData.name,
                description: formData.description,
                tags: formData.tags,
                color: (formData.color) ? formData.color : oldData.color,
                image: (formData.image) ? formData.image : oldData.image
            }, {merge: true});
    }

    getAllTagCategories() {
        return this.db.collection('tagCategories').valueChanges();
    }

    followCategoryTags(categories, user) {
        //1. Add user.tags -> tag.id = true,
        //2. Tags.followes + = user.uid = true

        const obj = {};
        const tagsArray = [];
        for (const item of categories) {
            for (const tag of item.tags) {
                obj[tag.id] = true;
                if (!tagsArray.includes(tag.id)) {
                    tagsArray.push(tag.id);
                }
            }
        }
        return this.authService.updateUserInstant(
            {tags: obj}, user.uid
        )
            .then(() => {
                const promiseArray = [];
                for (const tag of tagsArray) {
                    promiseArray.push(this.followTag(user, {id: tag}));
                }
                return Promise.all(promiseArray);
            });
    }

    private findFollower(user, tag) {
        return this.tagsCollection.doc(tag.id).collection('followers', ref => ref.where('uid', '==', user.uid)).get();
    }
    // getFollowersInstant(tag, add) {
    //     return this.tagsCollection.doc(tag.id).collection('followers').get().pipe(
    //         map(snapshot => {
    //             const items = [];
    //             snapshot.docs.map(a => {
    //                 add(a.data());
    //                 items.push(a.data());
    //             });
    //             return items;
    //         })
    //     )
    // }

    // private allUsersFollow(tagId) {
    //     const tags = {};
    //     tags[tagId] = true;
    //     const users = this.db.collection('users');
    //     users.get().pipe(
    //         map(snapshot => {
    //           const items = [];
    //           snapshot.docs.map(a => {
    //             const data = a.data();
    //             const id = a.id;
    //             items.push({ id, ...data });
    //           });
    //           return items;
    //         })
    //     ).subscribe(items => {
    //       items.forEach(user => {
    //         this.authService.updateUserInstant(
    //             { tags: {
    //               [tagId]: true
    //               }}, user.uid);
    //       });
    //     });
    //
    //
    // }
}
