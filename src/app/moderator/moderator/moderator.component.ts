import { Component, OnInit } from '@angular/core';
const ModeratorMenu = [
  {
    link: 'posts',
    name: 'Хэлэлцүүлгүүд'
  },
  {
    link: 'users',
    name: 'Хэрэглэгчид'
  },
  {
    link: 'tags',
    name: 'Tags'
  }
];
@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css']
})
export class ModeratorComponent implements OnInit {
  public topMenu = ModeratorMenu;
  constructor() {
  }
  ngOnInit(): void {
  }
}
