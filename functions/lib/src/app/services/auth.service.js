"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const firebase = require("firebase");
const snack_component_1 = require("../shared/components/snack/snack.component");
const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:4200/auth/welcome',
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
let AuthService = AuthService_1 = class AuthService {
    constructor(af, router, db, snackBar) {
        this.af = af;
        this.router = router;
        this.db = db;
        this.snackBar = snackBar;
        this.userCollection = this.db.collection('users');
        this.user$ = this.af.authState.pipe(operators_1.switchMap(user => {
            if (user) {
                return this.userCollection.doc(user.uid).valueChanges();
            }
            else {
                return rxjs_1.of(null);
            }
        }));
    }
    static getDisplayName(user) {
        return (user.firstName || user.lastName) ? (user.firstName + ' ' + user.lastName.charAt(0) + '.') : null;
    }
    getUser() {
        return this.user$.pipe(operators_1.first()).toPromise();
    }
    getUserById(user) {
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
            }
            else {
                return this.createUserData(credential.user)
                    .then(() => {
                    return new Promise(resolve => {
                        resolve({ firstTime: true, uid: credential.user.uid });
                    });
                });
            }
        });
    }
    checkUserExist(user) {
        const userRef = this.userCollection.doc(user.uid);
        return userRef.get().toPromise()
            .then(doc => {
            return (doc.exists);
        });
    }
    emailSignUp(userData) {
        return this.af.createUserWithEmailAndPassword(userData.email, userData.password)
            .then(res => {
            userData.uid = res.user.uid;
            userData.createdAt = new Date();
            this.emailVerify(userData.email);
            return this.createUserData(userData)
                .then(() => {
                return new Promise(resolve => {
                    resolve({ firstTime: true, uid: res.user.uid });
                });
            });
        });
    }
    passwordReset(email) {
        return this.af.sendPasswordResetEmail(email);
    }
    signIn(userData) {
        return this.af.signInWithEmailAndPassword(userData.email, userData.password);
    }
    emailVerify(email) {
        console.log('email sending..', email);
        this.af.sendSignInLinkToEmail(email, actionCodeSettings)
            .then(() => {
            window.localStorage.setItem('emailForSignIn', email);
            console.log('email sent');
        })
            .catch(err => {
            console.log(err.message);
        });
    }
    async signOut() {
        await this.af.signOut()
            .then(res => {
            console.log('Successfully signed out');
            this.snackBar.openFromComponent(snack_component_1.SnackComponent, {
                data: 'Амжилттай гарлаа'
            });
        });
        return this.router.navigate(['/']);
    }
    updateUserData(user) {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            email: user.email,
            updatedAt: new Date()
            // displayName: user.displayName,
        };
        return ref.set(data, { merge: true });
    }
    updateUserInstant(data, uid) {
        const ref = this.userCollection.doc(uid);
        return ref.set(data, { merge: true });
    }
    createUserData(user) {
        const ref = this.userCollection.doc(user.uid);
        const data = {
            uid: user.uid,
            createdAt: new Date(),
            email: user.email,
            firstName: (user.firstName) ? user.firstName : null,
            lastName: (user.lastName) ? user.lastName : null,
            displayName: (user.displayName) ? user.displayName : AuthService_1.getDisplayName(user),
            roles: {
                guest: true
            },
        };
        return ref.set(data, { merge: true });
    }
    verify(user) {
        return this.userCollection.doc(user.uid)
            .set({ verified: true }, { merge: true });
    }
    notVerify(user) {
        return this.userCollection.doc(user.uid)
            .set({ verified: false }, { merge: true });
    }
};
AuthService = AuthService_1 = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map