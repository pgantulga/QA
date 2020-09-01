import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap, map} from 'rxjs/operators';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
  @Input() content: any;
  @Input() currentRoute: any;
  detail: any;
  constructor( public router: Router, public route: ActivatedRoute, public tagService: TagService) { }

    ngOnInit(): void {
        this.tagService.currentTag.subscribe(tagId => this.detail = this.tagService.getTagInfo(tagId));
    }

}
