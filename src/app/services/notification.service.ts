import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from './auth.service';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    notificationObjectsRef = this.db.collection('notificationObjects');
    notifiersRef = this.db.collection('notifiers');
    tokenRef = this.db.collection('notificationTokens');
    postRef = this.db.collection('posts');
    userRef = this.db.collection('users');

    constructor(private db: AngularFirestore, private dialog: MatDialog, private authService: AuthService) {
    }

    getNotifications(user) {
        return this.db.collection('notifiers', ref => ref.where('notifier', '==', user.uid)
            .orderBy('createdAt', 'desc')
            .limit(10)).valueChanges({idField: 'id'});
    }

    async getAllNotificationsNumber(user) {
         const notifications = await this.db.collection('notifiers', ref => ref.where('notifier', '==', user.uid)
            .orderBy('createdAt', 'desc')).ref.get();
         return notifications.size;
    }

    removeNotification(notifierId) {
        return this.notifiersRef.doc(notifierId).delete();
    }

    createNotificationObject(entityId, user, entityType, objectType, parentId?): any {
        return this.notificationObjectsRef.add({
            entity: entityId,
            entity_type: entityType,
            type: objectType,
            createdAt: new Date(),
            status: 1,
            actor: user.uid,
            parent: (parentId) ? parentId : null
        })
            .then(async (res) => {
                let messageText = '';
                if (entityType >= 4) {
                    const followers = await this.getFollowers(parentId);
                    messageText = await this.generateMessage(user.uid, entityType, entityId, parentId);
                    this.addNotifiers(res.id, followers, messageText, entityType, user.uid, parentId);
                } else {
                    const followers = await this.getFollowers(entityId);
                    messageText = await this.generateMessage(user.uid, entityType, entityId);
                    this.addNotifiers(res.id, followers, messageText, entityType, user.uid);
                }
                return res.update({
                    id: res.id,
                    message: messageText
                });
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    private addNotifiers(notificationId, followers, messageText, entityType, actor, parent?) {
        const promises = [];
        if (parent) {
            followers.forEach(follower => {
                promises.push(this.createNotifier(notificationId, follower.data().uid, messageText, entityType, actor, parent));
            });
        } else {
            followers.forEach(follower => {
                promises.push(this.createNotifier(notificationId, follower.data().uid, messageText, actor, entityType));
            });
        }
        return Promise.all(promises);
    }

    private createNotifier(notificationId, uid, messageText, entityType, actorId, parent?) {
        console.log('createNotifier');
        return this.notifiersRef.add(
            {
                notificationObjectId: notificationId,
                notifier: uid,
                status: 1,
                message: messageText,
                entity_type: entityType,
                parent: (parent) ? parent : null,
                createdAt: new Date(),
                actor: actorId

            }
        )
            .catch(err => {
                console.log(err);
            });
    }

    getNotificationObject(objectId) {
        return this.notificationObjectsRef.doc(objectId).ref.get();
    }

    updateNotifier(notifierId, data) {
        return this.notifiersRef.doc(notifierId).set(
            data, {merge: true}
        );
    }

    async checkNotificationToken(user) {
        console.log(user)
        const userData = await this.userRef.doc(user.uid).ref.get();
        return (userData.data().notificationTokens) ? true : false;
        // return !!userData.data().notificationTokens;
    }

    async savePushNotificationsToUser(token, user) {
        const userData = await this.userRef.doc(user.uid).ref.get();
        let tokens = [];
        if (userData.data().notificationTokens) {
            tokens = tokens.concat(userData.data().notificationTokens);
            tokens.push(token);
        } else {
            tokens.push(token);
        }
        return this.userRef.doc(user.uid)
            .set({
                notificationTokens: tokens
            }, {merge: true})
            .then(() => {
                return this.saveNotificationToken(token, user);
            });
    }

    private saveNotificationToken(tokenId, user) {
        return this.tokenRef.add({
            token: tokenId,
            uid: user.uid
        });
    }



    private getFollowers(postId) {
        return this.db.collection('posts').doc(postId).collection('followers').ref.get();
    }

    private async generateMessage(actor, entityType, entityId, parent?) {
        const messageTitle = (entityType >= 4) ? await this.getPostTitle(parent) : await this.getPostTitle(entityId);
        const actorName = await this.getActorName(actor);
        if (entityType === 1) {
            return `'${messageTitle}' \n${actorName} шинэ хэлэлцүүлэг нэмлээ.`;
        } else if (entityType === 2) {
            return `'${messageTitle}' \n хэлэлцүүлэгт засвар нэмэгдлээ.`;
        } else if (entityType === 4) {
            return `'${messageTitle}' \n хэлэлцүүлэгт ${actorName}  хариулт нэмлээ.`;
        } else if (entityType === 5) {
            return `'${messageTitle}' \n хэлэлцүүлэгт ${actorName}  хариулт нэмлээ.`;
        }
    }

    private async getPostTitle(postId) {
        const document = await this.postRef.doc(postId).ref.get();
        return document.data().title;
    }

    private async getActorName(uid) {
        const document = await this.userRef.doc(uid).ref.get();
        return document.data().displayName;
    }
}
