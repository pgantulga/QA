"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const core_1 = require("@angular/core");
let PermissionService = class PermissionService {
    constructor(authService, db) {
        this.authService = authService;
        this.db = db;
        this.checkAuth = (user, allowedRoles) => {
            if (!user) {
                return false;
            }
            for (const role of allowedRoles) {
                if (user.roles[role]) {
                    return true;
                }
            }
        };
    }
    reset(uid) {
        return this.authService.updateUserInstant({
            roles: {
                guest: false,
                subscriber: false,
                member: false,
                moderator: false,
                admin: false
            }
        }, uid).then(() => {
        });
    }
    selectRole(role, uid) {
        if (role === 'admin') {
            console.log('Sorry, cant make admin');
            return null;
        }
        this.reset(uid);
        return this.authService.updateUserInstant({
            roles: {
                [role]: true
            }
        }, uid);
    }
    changeRole(role, uid) {
        // toggles roll
        role.value = !role.value;
        this.reset(uid);
        this.authService.updateUserInstant({
            roles: {
                [role.key]: role.value
            }
        }, uid).then(() => { });
    }
    setRole(role, uid) {
        // setting only this role to be true
        this.reset(uid)
            .then(() => {
            return this.authService.updateUserInstant({
                roles: {
                    [role.key]: true
                }
            }, uid);
        });
    }
    onlyGuest(user) {
        return user.roles.guest;
    }
    canSee(user) {
        const allowed = ['guest', 'subscriber', 'member', 'moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
    canRead(user) {
        const allowed = ['subscriber', 'member', 'moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
    canCreate(user) {
        const allowed = ['subscriber', 'member', 'moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
    canEdit(user) {
        const allowed = ['moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
    canDelete(user) {
        const allowed = ['admin'];
        return this.checkAuth(user, allowed);
    }
    canVote(user) {
        const allowed = ['subscriber', 'member', 'moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
    canRecommend(user) {
        const allowed = ['subscriber', 'member', 'moderator', 'admin'];
        return this.checkAuth(user, allowed);
    }
};
PermissionService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map