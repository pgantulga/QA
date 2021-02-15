import { Component, OnInit } from '@angular/core';
const ModeratorMenu = [

  {
    link: 'users',
    name: 'Хэрэглэгчид'
  },
  {
    link: 'tags',
    name: 'Сэдвүүд'
  }
];
@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {
  public topMenu = ModeratorMenu;
  constructor() {
  }
  ngOnInit(): void {
  }
}
