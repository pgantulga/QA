import { Component, OnInit } from '@angular/core';
import {TagService} from '../../services/tag.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  tagDetail$: any;
  constructor( public tagService: TagService, public route: ActivatedRoute) { }
  ngOnInit(): void {
    this.tagDetail$ = this.route.paramMap.pipe(
        switchMap(params => {
          this.tagService.setCurrentTag(params.get('tagId'));
          return this.tagService.getTagInfo(params.get('tagId'));
        })
    );
  }

}
