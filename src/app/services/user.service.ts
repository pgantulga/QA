import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userCollection = this.db.collection<any>('users');
    userSource = new BehaviorSubject('default');
    selectedUser = this.userSource.asObservable();

    constructor(private db: AngularFirestore) {
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
}
