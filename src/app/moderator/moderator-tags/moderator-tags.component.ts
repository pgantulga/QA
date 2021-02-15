import { PermissionService } from './../../services/permission.service';
import { AuthService } from './../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TagService } from 'src/app/services/tag.service';
import { TagUpdateComponent } from 'src/app/tag/tag-update/tag-update.component';
import { TagAddComponent } from 'src/app/tag/tag-add/tag-add.component';

@Component({
  selector: 'app-moderator-tags',
  templateUrl: './moderator-tags.component.html',
  styleUrls: ['./moderator-tags.component.css']
})
export class ModeratorTagsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'totalUsed', 'type', 'action'];
  recommendTable: string[] = ['name', 'type', 'author', 'createdAt', 'description', 'action'];
  recommends$: Observable<any>;
  tags$: Observable<any>;
  name: string;
  description: string;
  constructor(private tagService: TagService,
              private dialog: MatDialog,
              public authService: AuthService,
              public permissionService: PermissionService
              ) { }

  ngOnInit(): void {
    this.tags$ = this.tagService.getAllTags();
    this.recommends$ = this.tagService.getAllTagRecommends();
  }
  edit(oldData) {
    const dialogRef = this.dialog.open(TagUpdateComponent, {
      width: '500px',
      data: {
        name: oldData.name,
        description: oldData.description
      }
    });
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          this.tagService.updateTag(result, oldData)
            .then(() => {
              console.log('tag Updated');
            });
        }
      });
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
  commit(item) {
    return this.tagService.commitRecommend(item);
  }
}
