import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TagAddComponent, TagData} from '../tag-add/tag-add.component';

@Component({
  selector: 'tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent {
  constructor(public dialogRef: MatDialogRef<TagAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TagData) {
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
