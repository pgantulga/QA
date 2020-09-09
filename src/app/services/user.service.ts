import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCollection = this.db.collection<any>('users');
  userSource = new BehaviorSubject('default');
  selectedUser = this.userSource.asObservable();

  constructor(private db: AngularFirestore) { }
  setSelectedUser(uid) {
    this.userSource.next(uid);
  }
  getAll() {
    return this.userCollection.valueChanges();
  }
  getUserDetail(uid) {
    return this.userCollection.doc(uid).valueChanges();
  }
}
