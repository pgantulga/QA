import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap, map} from 'rxjs/operators';
import {TagService} from '../../../services/tag.service';

@Component({
  selector: 'detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit, OnDestroy {
  @Input() content: any;
  detail: any;
  currentRoute: any;
  constructor( public router: Router, public route: ActivatedRoute, public tagService: TagService) { }

    ngOnInit(): void {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe(e => {
                // @ts-ignore
                if (e.url.includes('/tagDetail')) {
                    this.tagService.currentTag.subscribe(tagId => this.detail = this.tagService.getTagInfo(tagId));
                    this.currentRoute = 'tagDetail';
                }
                // @ts-ignore
                if (e.url.includes('/user')) {
                    this.currentRoute = 'profileDetail';
                }
            });
    }
    ngOnDestroy(): void {
        this.tagService.setCurrentTag(null);
    }

}
