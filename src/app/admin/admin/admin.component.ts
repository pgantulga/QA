import { Component, OnInit } from '@angular/core';
const AdminMenu = [
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  topMenu: any;

  constructor() { }

  ngOnInit(): void {
    this.topMenu = AdminMenu;
  }
}
