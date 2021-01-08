import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
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
    member?: boolean;
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

    constructor(public af: AngularFireAuth, private router: Router, private db: AngularFirestore, public snackBar: MatSnackBar) {
        this.user$ = this.af.authState.pipe(
            switchMap(user => {
                if (user) {
                    return this.userCollection.doc<User>(user.uid).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }
    private userCollection = this.db.collection<any>('users');
    user$: Observable<User>;

    private static getDisplayName(user): any {
      return (user.firstName || user.lastName) ? (user.firstName + ' ' + user.lastName.charAt(0) + '.') : null;
    }

    getUser(): Promise<any> {
        return this.user$.pipe(first()).toPromise();
    }
    async googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.af.signInWithPopup(provider);
        return this.checkUserExist(credential.user)
            .then(res => {
              if (res) {
                return this.updateUserData(credential.user);
              } else {
                return this.createUserData(credential.user)
                    .then(() => {
                      return new Promise(resolve => {
                        resolve({firstTime: true});
                      });
                    });
              }
            });
    }

    private checkUserExist(user) {
        const userRef = this.userCollection.doc(user.uid);
        return userRef.get().toPromise()
            .then(doc => {
                return (doc.exists);
            });
    }

    emailSignUp(userData, errorSender) {
        return this.af.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(res => {
                userData.uid = res.user.uid;
                userData.createdAt = new Date();
                this.emailVerify(userData.email);
                return this.createUserData(userData);
            })
            .catch(err => {
                errorSender(err.message);
            });
    }

    signIn(userData) {
        return this.af.signInWithEmailAndPassword(userData.email, userData.password);
    }

    private emailVerify(email) {
        this.af.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(err => {
                console.log(err.message);
            });
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

    private updateUserData(user: any): any {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
        };
        return ref.set(data, {merge: true});
    }

    updateUserInstant(data: any, uid) {
        const ref = this.userCollection.doc(uid);
        return ref.set(data, {merge: true});
    }

    private createUserData(user: any) {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            createdAt: new Date(),
            email: user.email,
            firstName: (user.firstName) ? user.firstName : null,
            lastName: (user.lastName) ? user.lastName : null,
            displayName: (user.displayName) ?  user.displayName : AuthService.getDisplayName(user) ,
            roles: {
                guest: true
            },
        };
        return ref.set(data, {merge: true});
    }
}

