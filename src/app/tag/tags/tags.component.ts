import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TagAddComponent} from '../tag-add/tag-add.component';
import {TagService} from '../../services/tag.service';
import {AuthService} from '../../services/auth.service';
import {PermissionService} from "../../services/permission.service";

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
  currentUser: any;
  tags: any;
  constructor(public dialog: MatDialog, public tagService: TagService, public authService: AuthService, public permissionService: PermissionService) { }
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
    this.tags = this.tagService.getAllTags();
    this.authService.getUser().then(user => {
      this.currentUser = user;
    });
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
          if ( result ) {
            this.tagService.createTag(result, this.currentUser);
            console.log(result);
          }
        });
  }
}
