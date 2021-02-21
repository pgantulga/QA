import { Company } from './../../../services/company.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagUpdateComponent } from 'src/app/tag/tag-update/tag-update.component';

@Component({
  selector: 'company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent{

  constructor(public dialogRef: MatDialogRef<TagUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Company) {
  }
  cancel(): void {
    this.dialogRef.close();
  }
}
