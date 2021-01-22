import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TagUpdateComponent} from '../../tag/tag-update/tag-update.component';
import {TagData} from '../../tag/tag-add/tag-add.component';
import {ColorService} from '../../services/color.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

export interface CategoryData {
  name: string;
  description: string;
  tags: any;
  color: any;
  image: any;
}
@Component({
  selector: 'admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent {
  fileToUpload: File = null;
  task: AngularFireUploadTask;
  percentage: Observable<any>;
  snapshot: Observable<any>;
  constructor(public dialogRef: MatDialogRef<TagUpdateComponent>,
              private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public data: CategoryData,
              public colorService: ColorService) {
  }
  cancel(): void {
    this.dialogRef.close();
  }
  getTag(tag) {
    if (!this.data.tags) {
      this.data.tags = [];
    }
    tag.forEach(item => {
      this.data.tags.push(item);
    });
  }
  onFileSelected(files) {
    this.fileToUpload = files.item(0);
  }
  upload() {
    const path = `images/tag_category/${this.data.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.fileToUpload);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
        finalize( async () => {
          this.data.image = await ref.getDownloadURL().toPromise();
        })
    );
  }

}
