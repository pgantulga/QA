import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {
  user$: Observable<any>;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.selectedUser
        .subscribe(uid => {
          this.user$ = this.userService.getUserDetail(uid);
        });
  }
}
