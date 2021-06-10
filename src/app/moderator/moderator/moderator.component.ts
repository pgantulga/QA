import { Component, OnInit } from '@angular/core';
const ModeratorMenu = [
  {
    link: 'overview',
    name: 'Ерөнхий'
  },
  {
    link: 'users',
    name: 'Хэрэглэгчид'
  },
  {
    link: 'tags',
    name: 'Сэдвүүд'
  },
  {
    link: 'companies',
    name: 'Байгууллагууд'
  },
  {
    link: 'banners',
    name: 'Баннерууд'
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
