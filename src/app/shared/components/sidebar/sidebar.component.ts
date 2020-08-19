import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
export interface Tag {
  name: string;
  usedNumber: number;
}
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  tags: Tag[] = [
    {name: 'Алт', usedNumber: 5},
    {name: 'Нүүрс', usedNumber: 6},
    {name: 'Зэс', usedNumber: 6},
    {name: 'Жонш', usedNumber: 10},
    {name: 'АМТХ', usedNumber: 3},
    {name: 'Татвар', usedNumber: 2},
    {name: 'БОТХ', usedNumber: 2},
    {name: 'Ус', usedNumber: 2},
    {name: 'ИТБТХ', usedNumber: 2},
    {name: 'ХУУ', usedNumber: 2},
    {name: 'Орон нутаг', usedNumber: 2},
  ];

  ngOnInit(): void {

  }
}
