import { Injectable } from '@angular/core';
import { AuthService, User, Roles } from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService, private db: AngularFirestore) { }
  reset(uid) {
    return this.authService.updateUserInstant(
        {
          roles: {
            guest: false,
            subscriber: false,
            member: false,
            moderator: false,
            admin: false
          }
        }
        , uid).then(() => {
    });
  }
  selectRole(role: string , uid: string ) {
    if (role === 'admin') {
      console.log('Sorry, cant make admin');
      return null;
    }
    this.reset(uid);
    return this.authService.updateUserInstant(
      {
        roles: {
          [role]: true
        }
      }, uid);
  }
  changeRole(role, uid) {
    // toggles roll
    role.value = !role.value;
    this.reset(uid);
    this.authService.updateUserInstant(
        {
          roles: {
            [role.key]: role.value
          }
        }
        , uid).then(() => {});
  }
  setRole(role, uid) {
    // setting only this role to be true
    return this.reset(uid)
        .then(() => {
          return this.authService.updateUserInstant(
              {
                roles: {
                  [role.key]: true
                }
              }, uid);
        });
  }

  private checkAuth = (user: User, allowedRoles: string[]): boolean => {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
  }
  onlyGuest(user: User): boolean {
    return user.roles.guest;
  }
  canSee(user: User): boolean {
    const allowed = ['guest', 'subscriber', 'member', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
  canRead(user: User): boolean {
    const allowed = ['subscriber', 'member', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }

  canCreate(user: User): boolean {
    const allowed = ['subscriber', 'member', 'moderator', 'admin'];
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
    const allowed = ['subscriber', 'member', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }

  canRecommend(user: User): boolean {
    const allowed = ['subscriber', 'member', 'moderator', 'admin'];
    return this.checkAuth(user, allowed);
  }
}
