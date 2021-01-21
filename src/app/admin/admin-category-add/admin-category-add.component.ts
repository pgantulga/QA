import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TagUpdateComponent} from '../../tag/tag-update/tag-update.component';
import {TagData} from '../../tag/tag-add/tag-add.component';
import {ColorService} from '../../services/color.service';

export interface CategoryData {
  name: string;
  description: string;
  tags: any;
  color: any;
}
@Component({
  selector: 'admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent {
  constructor(public dialogRef: MatDialogRef<TagUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CategoryData,
              public colorService: ColorService) {
  }
  cancel(): void {
    this.dialogRef.close();
  }
  getTag(tag) {
    tag.forEach(item => {
      this.data.tags.push(item);
    });
  }

}
