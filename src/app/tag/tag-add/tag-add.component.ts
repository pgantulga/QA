import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TagUpdateComponent} from '../tag-update/tag-update.component';

export interface TagData {
  allUserFollowed: boolean;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  usedNumber: number;
  createdBy: {
    displayName: string;
    uid: string
  };
}
@Component({
  selector: 'dialog-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss']
})
export class TagAddComponent  {
  constructor(public dialogRef: MatDialogRef<TagUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TagData) {
    this.data.allUserFollowed = false;
  }
  cancel(): void {

    this.dialogRef.close();
  }
}
