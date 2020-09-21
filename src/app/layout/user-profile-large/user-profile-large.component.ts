import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-profile-large',
  templateUrl: './user-profile-large.component.html',
  styleUrls: ['./user-profile-large.component.scss']
})
export class UserProfileLargeComponent implements OnInit {
  @Input() user: any;
  avatar: string;
  constructor() {
  }
  ngOnInit(): void {
    this.avatar = this.user.displayName.charAt(0);
  }

}
