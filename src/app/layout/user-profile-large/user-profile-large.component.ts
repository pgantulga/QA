import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'user-profile-large',
  templateUrl: './user-profile-large.component.html',
  styleUrls: ['./user-profile-large.component.scss']
})
export class UserProfileLargeComponent implements OnInit {
  @Input() user: any;
  userData$: Observable<any>;
  avatar: string;
  constructor(private userService: UserService) {
  }
  ngOnInit(): void {
    this.avatar = this.user.displayName.charAt(0);
    this.userData$ = this.userService.getUserDetail(this.user.uid);
  }

}
