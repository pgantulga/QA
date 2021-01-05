import { Component, OnInit } from '@angular/core';
import {Roles, User} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  displayedColumns: string[] = ['email', 'displayName', 'uid', 'firstName', 'lastName'];
  users$: Observable<any>;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
  }

}
