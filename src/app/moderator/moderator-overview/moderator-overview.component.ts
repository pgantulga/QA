import { DialogComponent } from './../../shared/dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PermissionService } from './../../services/permission.service';
import { AuthService } from './../../services/auth.service';
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
    private tagService: TagService,
    public authService: AuthService,
    public permissionService: PermissionService,
    private dialogRef: MatDialog
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
    this.askDialog(()=> {
      return this.systemService.resetPost();
    })
   }
  
  resetUser() {
    this.askDialog(() => {
      return this.systemService.resetUsers();
    })
  }

  deleteNotifObjects() {
    this.askDialog(() => {
      return this.systemService.deleteNotObjects()
    })
  }

  deleteNotifiers() {
    this.askDialog(() => {
      return this.systemService.deleteNotifiers();
    })
  }

  deleteNotifTokents() {
    this.askDialog(() => {
      return this.systemService.deleteNotifTokens();
    })
  }

  deleteTagFollowers() {
    this.askDialog(() => {
      return this.systemService.deleteAllTagFollowers();
    })
  }
  
  private askDialog(method) {
    return this.dialogRef.open(DialogComponent, {
      data: {
        title: 'Are you sure?',
        content: 'There is no go back!!'
      }
    }).afterClosed()
    .subscribe(res => {
      if (res) {
        return method().then(()=> {console.log('Done!')})
      }
    })
  }

}
