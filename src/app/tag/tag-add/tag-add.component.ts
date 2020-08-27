import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface TagData {
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
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent  {
  constructor(public dialogRef: MatDialogRef<TagAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TagData) {
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
