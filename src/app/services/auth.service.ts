import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../shared/components/snack/snack.component';

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    displayName: string;
    roles: Roles;
    uid: string;
    tags: any;
    notificationTokens: any[];
    verified: boolean;
}

export interface Roles {
    guest?: boolean;
    subscriber?: boolean;
    moderator?: boolean;
    admin?: boolean;
    member?: boolean;
}

const actionCodeSettings = {
    url: 'https://uurkhaichin.mn/auth/welcome',
    handleCodeInApp: true,
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public af: AngularFireAuth,
        private router: Router,
        private db: AngularFirestore,
        public snackBar: MatSnackBar,
    ) {
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

    getUser(): Promise<any> {
        return this.user$.pipe(first()).toPromise();
    }
    getUserById(user): Observable<any> {
        return this.userCollection.doc(user.uid).valueChanges();
    }
    async googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.af.signInWithPopup(provider);
        return this.checkUserExist(credential.user)
            .then(res => {
                if (res) {
                    return this.updateUserData(credential.user)
                        .then(() => {
                            return new Promise(resolve => {
                                resolve({ firstTime: false, uid: credential.user.uid });
                            });
                        });
                } else {
                    return this.createUserData(credential.user)
                        .then(() => {
                            return new Promise(resolve => {
                                resolve({ firstTime: true, uid: credential.user.uid });
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

    emailSignUp(userData) {
        return this.af.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(res => {
                return this.emailVerify(); });
    }

    async emailVerify() {
        return (await this.af.currentUser).sendEmailVerification()
            .then(() => {
                this.router.navigate(['/auth/email-verify']);
                console.log('email verification sent');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    passwordReset(email) {
        return this.af.sendPasswordResetEmail(email);
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

    private updateUserData(user: any): any {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            email: user.email,
            updatedAt: new Date()
            // displayName: user.displayName,
        };
        return ref.set(data, { merge: true });
    }

    updateUserInstant(data: any, uid) {
        const ref = this.userCollection.doc(uid);
        return ref.set(data, { merge: true });
    }

    createUserData(user: any) {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            createdAt: new Date(),
            email: user.email,
            firstName: (user.firstName) ? user.firstName : null,
            lastName: (user.lastName) ? user.lastName : null,
            displayName: (user.displayName) ? user.displayName : AuthService.getDisplayName(user),
            roles: {
                guest: true
            },
        };
        return ref.set(data, { merge: true });
    }

    private static getDisplayName(user): any {
        return (user.firstName || user.lastName) ? (user.firstName + ' ' + user.lastName.charAt(0) + '.') : null;
    }

    verify(user) {
        return this.userCollection.doc(user.uid)
            .set({ verified: true }, { merge: true });
    }
    notVerify(user) {
        return this.userCollection.doc(user.uid)
            .set({ verified: false }, { merge: true });
    }
}

