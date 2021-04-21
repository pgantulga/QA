import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Roles } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userCollection = this.db.collection<any>('users');
    userSource = new BehaviorSubject('default');
    selectedUser = this.userSource.asObservable();

    constructor(private db: AngularFirestore) {
    }

    getUserMeta() {
        return this.db.doc('metas/user').valueChanges();
    }

    setSelectedUser(uid) {
        this.userSource.next(uid);
    }

    getAll() {
        return this.db.collection('users', ref => ref.orderBy('updatedAt', 'desc')).valueChanges();
    }

    getUserDetail(uid) {
        return this.userCollection.doc(uid).valueChanges();
    }

    getUserData(user): Observable<User> {
        return this.userCollection.doc<User>(user.uid).valueChanges();
    }

    getUserScores(user): any {
        return [
            {
                icon: 'done',
                description: 'Хэрэглэгчийн хүлээн авсан vote',
                value: user.votesReceived,
            },
            {
                icon: 'forum',
                description: 'Хэрэглэгчийн оруулсан хэлэлцүүлэг',
                // value:
            }
        ];
    }
    async resetUsers() {
        const followersPromise = await this.db.collection('users').ref.get();
        followersPromise.forEach(item => {
            if (!item.data().roles || !(item.data().roles.admin || item.data().roles.moderator)) {
                console.log(item.data())
                return this.db.collection('users').doc(item.id).delete();
            }
        })
    }
}
