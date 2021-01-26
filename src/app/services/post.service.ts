import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {TagService} from './tag.service';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {query} from '@angular/animations';
import {NotificationService} from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    postCollection = this.db.collection<any>('posts', ref => ref.orderBy('createdAt', 'desc'));
    postMetaDoc = this.db.doc('metas/post');

    constructor(private db: AngularFirestore, public tagService: TagService, private notificationService: NotificationService) {
    }

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

    getPostByTag(tag) {
        return this.db.collection('posts', ref => ref.orderBy('totalVotes', 'desc')
            .where('tags', 'array-contains', {id: tag.id, name: tag.name}).limit(10)).valueChanges();
    }

    getPostByUser(user) {
        console.log(user.uid);
        return this.db.collection('posts', ref => ref.orderBy('createdAt', 'desc')
            .where('uid', '==', user.uid)).valueChanges();
    }

    async getUserPostNumber(user) {
        const posts = await this.getPostByUser(user).toPromise();
        console.log(posts);
        return posts.length;
    }

    getAnswersByUser(user) {
        return this.db.collectionGroup('answers', ref => ref.orderBy('votesNumber', 'desc')
            .where('author.id ', '==', user.uid)).valueChanges();
    }

    createPost(formData, user, tagsArray) {
        return this.postCollection.add({
            title: formData.title,
            content: formData.content,
            createdAt: new Date(),
            updatedAt: new Date(),
            uid: user.uid,
            author: {
                displayName: user.displayName,
                uid: user.uid,
            },
            isOpen: true,
            isParent: true,
            answersCount: 0,
            totalVotes: 0,
            viewCount: 0,
            tags: tagsArray,
        }).then((res) => {
            return this.addFollowers(tagsArray, res.id)
                .then(() => {
                    this.notificationService.createNotificationObject(res.id, user, 1, 'post');
                    return res.update({
                        id: res.id,
                    });
                })
                .then(() => {
                    return this.addLog(user, 'created', res.id);
                })
                .then(() => {
                    return this.followPost({id: res.id}, user);
                });
        })
            .catch(error => {
                console.log('something happened' + error);
            });
    }

    async addFollowers(tags, postId) {
        // get followers from tags
        const promises = [];
        const followers = [];
        for (const tag of tags) {
            promises.push(this.tagService.tagsCollection.doc(tag.id).collection('followers').ref.get());
        }
        const allFollowers = await Promise.all(promises);
        for (const follower of allFollowers) {
            follower.forEach(doc => {
                if (!(!!followers.find(t => t.uid === doc.data().uid))) {
                    followers.push(doc.data());
                }
            });
        }
        const addPromises = [];
        followers.forEach(item => {
            addPromises.push(this.postCollection.doc(postId).collection('followers')
                .add({uid: item.uid}));
        });
        console.log(addPromises);
        return Promise.all(addPromises);
    }

    getFollowers(postId) {
        return this.postCollection.doc(postId).collection('followers').ref.get();
    }



    savePost(formData, user, tagsArray, oldValue) {
        return this.postCollection.doc(oldValue.id).set({
            title: formData.title,
            content: formData.content,
            updatedAt: new Date(),
            tags: tagsArray
        }, {merge: true}).then(
            () => {
                console.log('save log');
                return this.addLog(user, 'edited', oldValue.id);
            }
        );
    }

    deletePost(postId) {
        return this.postCollection.doc(postId).delete();
    }

    getPinnedPost(): Observable<any> {
        return this.db.collection('posts', ref => ref.where('pinned', '==', true)).valueChanges();
    }

    pinPost(postId) {
        return this.postCollection.doc(postId).set({pinned: true}, {merge: true});
    }

    unpinPost(postId) {
        return this.postCollection.doc(postId).set({pinned: false}, {merge: true});
    }

    addLog(user, action: string, postId) {
        const types = ['created', 'edited', 'voted', 'devoted', 'answered', 'replied'];
        // const types_mn = ['Нэмсэн', 'Зассан', 'Санал өгсөн', 'Саналаа буцаасан', 'Хариулт өгсөн', 'Хариулсан' ]
        const ref = this.postCollection.doc(postId).collection('logs');
        if (!types.includes(action)) {
            return null;
        }
        return ref.add({
            user: {
                displayName: user.displayName,
                uid: user.uid
            },
            type: action,
            timestamp: new Date()
        });
    }

    getLogs(postId) {
        return this.postCollection.doc(postId).collection('logs', ref => ref.orderBy('timestamp', 'desc')).valueChanges();
    }

    sort(sort) {
        switch (sort) {
            case 'latest':
                return this.db.collection<any>('posts', ref => ref.orderBy('updatedAt', 'desc'));
            case 'active':
                return this.db.collection<any>('posts', ref => ref.orderBy('answersCount', 'desc'));
        }
    }

    onlyUnique(value, index, self) {
        return index === self.findIndex(t => t.uid === value.uid);
    }

    followPost(post, user) {
        return this.checkFollower(user, post)
            .then(value => {
                    if (!value) {
                        return this.postCollection.doc(post.id).collection('followers')
                            .add({uid: user.uid})
                            .catch(err => {
                                console.log(err);
                            });
                    }
                }
            );
    }

    async unfollowPost(user, post) {
        const querySnapshot = await this.findFollower(user, post).toPromise();
        if (querySnapshot.docs.length) {
            querySnapshot.forEach(item => {
                return this.postCollection.doc(post.id).collection('followers').doc(item.id).delete();
            });
        }
    }

    async checkFollower(user, post) {
        const querySnapshot = await this.findFollower(user, post).toPromise();
        return !!querySnapshot.docs.length;
    }

    private findFollower(user, post) {
        return this.postCollection.doc(post.id).collection('followers', ref => ref.where('uid', '==', user.uid)).get();
    }
}
