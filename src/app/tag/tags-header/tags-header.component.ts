import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PermissionService} from '../../services/permission.service';
import {TagService} from "../../services/tag.service";
import {TagAddComponent} from "../tag-add/tag-add.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'tags-header',
  templateUrl: './tags-header.component.html',
  styleUrls: ['./tags-header.component.scss']
})
export class TagsHeaderComponent implements OnInit {
  metaData$: any;
  name: string;
  description: string;
  constructor(public authService: AuthService,
              public permissionService: PermissionService,
              private tagService: TagService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.metaData$ = this.tagService.tagMetaDoc.valueChanges();
  }
  openDialog(user) {
    const dialogRef = this.dialog.open(TagAddComponent, {
      width: '500px',
      data: {
        name: this.name,
        description: this.description
      }
    });
    dialogRef.afterClosed()
        .subscribe(result => {
          if (result) {
            this.tagService.createTag(result, user);
          }
        });
  }
}
