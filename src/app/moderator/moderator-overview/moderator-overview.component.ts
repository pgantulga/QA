import { SystemService } from './../../admin/system.service';
import { UserService } from './../../services/user.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-moderator-overview',
  templateUrl: './moderator-overview.component.html',
  styleUrls: ['./moderator-overview.component.scss']
})
export class ModeratorOverviewComponent implements OnInit {
  usersMeta: any;
  postMeta: any;
  tagMeta: any;
  constructor(
    private postService: PostService,
    private userService: UserService,
    public systemService: SystemService,
    private tagService: TagService
  ) { }

  ngOnInit(): void {
    this.postService.postMetaDoc.valueChanges()
      .subscribe((doc: any) => {
        this.postMeta = {
          title: 'Post',
          size: doc.size,
          updatedAt: doc.updatedAt,
          caption: '*All posts will be deleted except pinned.'
        }
      }
    )
    this.tagService.getMeta()
      .subscribe(doc => {
        this.tagMeta = {
          title: 'Tags',
          size: doc.size,
          updatedAt: doc.updatedAt,
          caption: 'Cannot delete all tags.'
        }
      })

    this.userService.getUserMeta()
      .subscribe((doc:any) => {
        this.usersMeta = {
          title: 'Users',
          size: doc.size,
          updatedAt: doc.updatedAt,
          caption: '*All users will be deleted except moderators and admins'
        }
      })
  }

  resetPost() {
    this.systemService.resetPost();
   }
  
  resetUser() {
    this.systemService.resetUsers();
  }

  deleteNotifObjects() {
    this.systemService.deleteNotObjects()
  }

  deleteNotifiers() {
    this.systemService.deleteNotifiers();
  }

  deleteNotifTokents() {
    this.systemService.deleteNotifTokens();
  }

  deleteTagFollowers() {
    this.systemService.deleteAllTagFollowers();
  }

}
