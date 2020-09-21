import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  @Input() user: any;
  avatar: string;
  constructor() {
  }
  ngOnInit(): void {
    this.avatar = this.user.displayName.charAt(0);
  }
}
