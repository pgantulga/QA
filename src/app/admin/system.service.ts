import { async } from '@angular/core/testing';
import { NotificationService } from './../services/notification.service';
import { PostService } from './../services/post.service';
import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { TagService } from '../services/tag.service';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(
    private userService: UserService,
    private postService: PostService,
    private notifService: NotificationService,
    private tagService: TagService,
    private db: AngularFirestore
  ) { }

  async resetPost() {
    const postRef = this.postService.postCollection;
    const postsPromise = await postRef.ref.get();
    postsPromise.forEach(item => {
      if (item.data().pinned) {
        console.log(item.data())
        // return this.postService.postCollection.doc(item.id).delete()
        // 1. delete all except pinned
        // 2. changepost meta number
      }

    })
  }

  async resetUsers() {
    return this.userService.resetUsers();
    //1. change users meta number
  }

  async deleteNotObjects() {
    const notifObjectsPromise = await this.notifService.notificationObjectsRef.ref.get();
    notifObjectsPromise.forEach(item => {
      console.log(item.data())

      // return this.notifService.notificationObjectsRef.doc(item.id).delete();
    })
  }

  async deleteNotifiers() {
    const notifiersPromise = await this.notifService.notifiersRef.ref.get();
    notifiersPromise.forEach(item => {
      console.log(item.data())
      // return this.notifService.notifiersRef.doc(item.id).delete();
    })
  }

  async deleteNotifTokens() {
    const notifTokenPromise = await this.notifService.tokenRef.ref.get();
    notifTokenPromise.forEach((item: any) => {
      console.log(item.data())
      // return this.notifService.tokenRef.doc(item.id).delete();
    })
  }

  async deleteAllTagFollowers() {
    const tagsPromise = await this.tagService.tagsCollection.ref.get();
    tagsPromise.forEach(tag => {
      if (tag.data().name === 'Орон нутаг') {
        this.deleteSingleTagFollower(tag);
        this.refrestTagUsedCount(tag);
      }
    })
  }

  private async deleteSingleTagFollower(tag) {
    const followersPromise = await this.tagService.tagsCollection.doc(tag.id)
      .collection('followers').ref.get();
    followersPromise.forEach(follower => {
      console.log(follower.data());
    })
  }
  private async refrestTagUsedCount(tag) {
    return this.tagService.tagsCollection.doc(tag.id).update(
      {
        totalUsed: 0,
        updatedAt: new Date()
      }
    )
  }
  
}
