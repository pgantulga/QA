import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {TagAddComponent} from '../tag-add/tag-add.component';
import {TagUpdateComponent} from '../tag-update/tag-update.component';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  tagDetail$: Observable<any>;
  filteredPosts$: Observable<any>;
  constructor( public tagService: TagService, public route: ActivatedRoute, public postService: PostService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.tagDetail$ = this.route.paramMap.pipe(
        switchMap(params => {
            this.tagService.setCurrentTag(params.get('tagId'));
            return this.tagService.getTagInfo(params.get('tagId'));
        })
    );
    this.filteredPosts$ = this.tagDetail$.pipe(
        switchMap( data => {
            return this.postService.getPostByTag({id: data.id, name: data.name});
        })
    );
  }
  openDialog(oldData) {
      const dialogRef = this.dialog.open(TagUpdateComponent, {
          width: '500px',
          data: {
              name: oldData.name,
              description: oldData.description
          }
      });
      dialogRef.afterClosed()
          .subscribe(result => {
              if ( result ) {
                  this.tagService.updateTag(result, oldData)
                      .then(() => {
                          console.log('tag Updated');
                      });
              }
          });  }

}
