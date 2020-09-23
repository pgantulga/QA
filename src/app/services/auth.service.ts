import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Observable,of} from "rxjs";
import {first, switchMap} from 'rxjs/operators';
import {AngularFirestore} from "@angular/fire/firestore";
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../shared/components/snack/snack.component';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  displayName: string;
  roles: Roles;
  uid: string;
}

export interface Roles {
  guest?: boolean;
  subscriber?: boolean;
  moderator?: boolean;
  admin?: boolean;
  phone: string;
}
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'qaproject-23417.firebaseapp.com',
  // This must be true.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userCollection = this.db.collection<any>('users');
  user$: Observable<User>;
  constructor(public af: AngularFireAuth, private router: Router, private db: AngularFirestore, public snackBar: MatSnackBar) {
    this.user$ = this.af.authState.pipe(
        switchMap( user => {
          if (user) { return this.userCollection.doc<User>(user.uid).valueChanges(); }
          else {return of(null); }
        })
    );
  }
  getUser(): Promise<any> {
    return this.user$.pipe(first()).toPromise();
  }
  getAllUser() {
    return this.userCollection.valueChanges();
  }
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.af.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  emailSignUp(userData, errorSender) {
    return this.af.createUserWithEmailAndPassword(userData.email, userData.password)
        .then(res => {
          console.log('Success, user id: ' + res.user.uid);
          userData.uid = res.user.uid;
          userData.createdAt = new Date ();
          this.emailVerify(userData.email);
          return this.createUserData(userData);
        })
        .catch(err => {
          errorSender(err.message);
        });
  }
  emailVerify(email) {
    this.af.sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', email);
        })
        .catch(err => {
          console.log(err.message);
        });
  }
  signIn(userData) {
    return this.af.signInWithEmailAndPassword(userData.email, userData.password);
  }
  async signOut() {
    await this.af.signOut()
        .then(res => {
          console.log('Successfully signed out');
          this.snackBar.openFromComponent(SnackComponent, {
            data: 'Амжилттай гарлаа'
          });
        });
    return this.router.navigate(['/']);
  }
  private updateUserData(user: any) {
    const ref = this.userCollection.doc(user.uid);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return ref.set(data, {merge: true});
  }
  updateUserInstant(data: any, uid) {
    console.log(uid);
    const ref = this.userCollection.doc(uid);
    return ref.set(data, {merge: true});
  }
  createUserData(user: any) {
    const ref = this.userCollection.doc(user.uid);
    const data = {
      uid: user.uid,
      createdAt: user.createdAt,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: this.getDisplayName(user.firstName, user.lastName),
      roles: {
        guest: true
      },
    };
    return ref.set(data, {merge: true});
  }
  getDisplayName(firstName, lastName) {
    return firstName + ' ' + lastName.charAt(0) + '.';
  }

  // permission and roles
  checkAuth(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if ( user.roles[role]) {
        return true;
      }
    }
  }
  canRead(user: User): boolean {
    const allowed = ['guest', 'subscriber', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
  canCreate(user: User): boolean {
    const allowed = ['subscriber', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
  canEdit(user: User): boolean {
    const allowed = ['moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuth(user, allowed);
  }

  canVote(user: User): boolean {
    const allowed = ['subscriber', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }

  canRecommend(user: User): boolean {
    const allowed = ['subscriber', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
}

