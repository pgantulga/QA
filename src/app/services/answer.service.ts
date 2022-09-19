import { entityType, LogService } from './log-service.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PostService } from './post.service';
import { Subject } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {
    answersRef: AngularFirestoreCollection<any>;
    repliesRef: AngularFirestoreCollection<any>;
    private highlightedTextSource: Subject<any> = new Subject<any>();
    highlightedText$ = this.highlightedTextSource.asObservable();

    constructor(
        private db: AngularFirestore,
        private postService: PostService,
        private notificationService: NotificationService,
        private logService: LogService
    ) {
    }

    setHighlightedText(value) {
        this.highlightedTextSource.next(value);
    }

    getAllAnswer(postId, sort) {
        this.answersRef = this.db.collection('posts').doc(postId).collection('answers', ref => ref.orderBy(sort.sort, 'desc'));
        return this.answersRef.valueChanges();
    }

    addAnswer(post, answer, user) {
        // tslint:disable-next-line: variable-name
        let temp_author ={};
        this.answersRef = this.db.collection('posts').doc(post.id).collection('answers', ref => ref.orderBy('createdAt', 'desc'));
        if (user) {
            temp_author = {
                displayName: user.displayName ,
                uid: user.uid ,
                profilePic: ''
            }
        } else {
            temp_author = {
                displayName: 'Anonymous' ,
                uid: 'anonymous' ,
                profilePic: ''
            }
        }
        const postObj = {
            content: answer.content,
            votesNumber: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            author: temp_author,
            parent: {
                id: post.id,
                title: post.title
            },
        }
        return this.answersRef.add(postObj)
            .then(res => {
                const entityId = this.logService.getEntityId('answers', res.id, postObj);
                this.logService.addEventObj('answers', entityId, entityType.create, user.uid);
                this.notificationService.createNotificationObject(res.id, user, 4, 'answer', post.id);
                this.postService.addLog(user, 'answered', post.id);
                return res.update({ id: res.id });
            })
            .then(() => {
                // return this.postService.followPost(post, user);
            })
            .catch(err => {
                console.log('Error occurred: ' + err);
            });
    }

    deleteAnswer(answer) {
        const entityId = this.logService.getEntityId('answers', answer.id, answer)
        return this.logService.addEventObj('answers', entityId, entityType.delete, answer.author.uid)
            .then(() => {
                return this.db.collection('posts/' + answer.parent.id + '/answers').doc(answer.id).delete();

            })
    }

    getReplies(answer) {
        console.log(answer);
        return this.db.collection('posts/' + answer.parent.id + '/answers/' + answer.id + '/replies', ref => ref
            .orderBy('createdAt', 'desc'))
            .valueChanges();
    }

    deleteReply(reply) {
        const entityId = this.logService.getEntityId('replies', reply.id, reply);
        this.logService.addEventObj('replies', entityId, entityType.delete, reply.author.uid);
        return this.db.collection('posts/' + reply.parentPost.id + '/answers/' + reply.parentAnswer.id + '/replies').doc(reply.id).delete();
    }

    addReply(post, answer, reply, user) {
        this.repliesRef = this.db.collection('posts').doc(post.id)
            .collection('answers').doc(answer.id)
            .collection('replies', ref => ref.orderBy('createdAt', 'desc'));

        const replyObj = {
            content: reply.content,
            createdAt: new Date(),
            author: {
                displayName: user.displayName,
                uid: user.uid,
                profilePic: ''
            },
            parentPost: {
                id: post.id,
                title: post.title
            },
            parentAnswer: {
                id: answer.id,
                content: answer.content
            },
            updatedAt: new Date()
        }
        return this.repliesRef.add(replyObj).then(res => {
            this.logService.addEventObj(
                'replies',
                this.logService.getEntityId('replies', res.id, replyObj),
                entityType.create,
                replyObj.author.uid
            )
            this.notificationService.createNotificationObject(res.id, user, 5, 'reply', post.id);
            this.postService.addLog(user, 'replied', post.id);
            return res.update({ id: res.id });
        })
            .then(() => {
                return this.postService.followPost(post, user);
            })
            .catch(err => {
                console.log('Error occured:' + err);
            });
    }


}
