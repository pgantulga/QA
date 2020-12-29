import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  @Input() user: any;
  userData$: Observable<any>;
  avatar: string;
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.avatar = this.user.displayName.charAt(0);
    this.userData$ = this.userService.getUserData(this.user);
  }
}
