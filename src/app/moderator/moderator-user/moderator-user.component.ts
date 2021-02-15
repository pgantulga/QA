import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {PermissionService} from '../../services/permission.service';

@Component({
  selector: 'app-moderator-user',
  templateUrl: './moderator-user.component.html',
  styleUrls: ['./moderator-user.component.scss']
})
export class ModeratorUserComponent implements OnInit {
  displayedColumns: string[] = ['email', 'displayName', 'uid', 'roles'];
  users$: Observable<any>;
  constructor(private userService: UserService, private permissionService: PermissionService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
  }
  changeRole(role, uid, roles) {
    const roleNames = ['admin', 'moderator', 'member', 'subscriber', 'guest'];
    this.permissionService.changeRole(role, uid);
  }
  reset(uid) {
    console.log(uid);
    this.permissionService.reset(uid);
  }
  changeUserRole(ev, uid) {
    // tslint:disable-next-line: forin
    console.log(ev.target.value, uid);
    this.permissionService.selectRole(ev.target.value, uid);
  }
}


