import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap, map} from 'rxjs/operators';
import {TagService} from '../../../services/tag.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'detail-header',
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
  detail: Observable<any>;
  constructor( public router: Router, public route: ActivatedRoute, public tagService: TagService) { }
    ngOnInit(): void {
        // this.detail = this.route.paramMap.pipe(
        //     switchMap((value: any) => {
        //       return this.tagService.getTagInfo(value.params.tagId);
        //     })
        // );
        this.detail = this.tagService.currentTag.pipe(
            switchMap((val: any) => {
                console.log(val)
                return this.tagService.getTagInfo(val);
            })
        );
    }

}
