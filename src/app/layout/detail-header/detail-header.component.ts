import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, switchMap, map} from 'rxjs/operators';
import {TagService} from '../../services/tag.service';
import {Observable} from 'rxjs';
import {TagUpdateComponent} from "../../tag/tag-update/tag-update.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {PermissionService} from "../../services/permission.service";

@Component({
    selector: 'detail-header',
    templateUrl: './detail-header.component.html',
    styleUrls: ['./detail-header.component.scss']
})
export class DetailHeaderComponent implements OnInit {
    detail: Observable<any>;
    isFollowed: boolean;

    constructor(public router: Router,
                private route: ActivatedRoute,
                private tagService: TagService,
                private dialog: MatDialog,
                public authService: AuthService,
                public permissionService: PermissionService) {
    }

    ngOnInit(): void {
        this.detail = this.tagService.currentTag.pipe(
            switchMap((val: any) => {
                return this.tagService.getTagInfo(val);
            })
        );
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
    toggleFollow(user, tagDetail) {
        (user.tags[tagDetail.id]) ? this.tagService.unfollowTag(user, tagDetail) : this.tagService.followTag(user, tagDetail);
        this.authService.updateUserInstant(
            {
                tags: {
                    [tagDetail.id]: !user.tags[tagDetail.id]
                }
            }, user.uid
        );
    }
}
