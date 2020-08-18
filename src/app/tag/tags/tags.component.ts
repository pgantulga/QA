import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TagAddComponent} from '../tag-add/tag-add.component';

@Component({
  selector: 'tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  dropDownMenu: any;
  selected: any;
  name: string;
  description: string;
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    this.dropDownMenu = [{
      name: 'Сүүлийн',
      sort: 'latest'
    },
      {
        name: 'Идэвхтэй',
        sort: 'active'
      }
    ];
    this.selected = this.dropDownMenu[0];
  }
  changeSort(sort) {
    this.selected = sort;
  }
  openDialog() {
    const dialogRef = this.dialog.open(TagAddComponent, {
      width: '500px',
      data: {
        name: this.name,
        description: this.description
      }
    });
    dialogRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
  }

}
