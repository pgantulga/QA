import { NotificationService } from './notification.service';
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
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public af: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    public snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    this.user$ = this.af.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.userCollection.doc<User>(user.uid).valueChanges();
        } else {
          return this.userCollection.doc<User>('anonymous').valueChanges()
          // return of(null);
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
    return this.userLoginHandler(credential);
  }
  async emailLogin(userData) {
    const credential = await this.af.signInWithEmailAndPassword(
      userData.email,
      userData.password
    );
    if (credential.user.emailVerified) {
      return this.userLoginHandler(credential);
    } else {
      return this.emailVerify();
    }
  }
  private async userLoginHandler(data) {
    const resolver = {
      firstTime: true,
      ...data.user,
    };
    const user = await this.getUser();
    if (user) {
      resolver.firstTime = user.company || user.position ? false : true;
      return new Promise((resolve) => {
        resolve(resolver);
      });
    } else {
      return this.createUserData(data.user).then(() => {
        return new Promise((resolve) => {
          resolve(resolver);
        });
      });
    }
  }

  emailSignUp(userData) {
    return this.af
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then((res) => {
        return this.emailVerify();
      });
  }

  async emailVerify() {
    return (await this.af.currentUser)
      .sendEmailVerification()
      .then(() => {
        this.router.navigate(['/auth/email-verify']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  passwordReset(email) {
    return this.af.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.af.signOut().then((res) => {
      console.log('Successfully signed out');
      this.snackBar.openFromComponent(SnackComponent, {
        data: 'Амжилттай гарлаа',
      });
    });
    return this.router.navigate(['/']);
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
      updatedAt: new Date(),
      email: user.email,
      displayName: user.displayName || null,
      roles: {
        guest: true,
      },
    };
    return ref.set(data, { merge: true }).then((res) => {
      this.notificationService.createNotificationObject(
        data.uid,
        data,
        0,
        'user'
      );
      this.notificationService.createNotificationObject(
        data.uid,
        data,
        11,
        'post'
      );
    });
  }

  verify(user) {
    return this.userCollection
      .doc(user.uid)
      .set({ verified: true }, { merge: true });
  }
  notVerify(user) {
    return this.userCollection
      .doc(user.uid)
      .set({ verified: false }, { merge: true });
  }
}
