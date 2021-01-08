import { Injectable } from '@angular/core';
import {AuthService, User} from './auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private authService: AuthService, private db: AngularFirestore) { }
  reset(uid) {
    this.authService.updateUserInstant(
        {
          roles: {
            guest: true,
            subscriber: true,
            member: false,
            moderator: false,
            admin: false
          }
        }
        , uid).then(() => {
      console.log('User role reset');
    });
  }
  changeRole(role, uid) {
    role.value = !role.value;
    this.authService.updateUserInstant(
        {
          roles: {
            [role.key]: role.value
          }
        }
        , uid).then(() => {
      console.log('User role reset');
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
