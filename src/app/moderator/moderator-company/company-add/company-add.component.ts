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
  storagePath: string;

  constructor(public dialogRef: MatDialogRef<TagUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Company) {
                this.storagePath = `images/logos/${this.data.name}`;
                console.log(this.storagePath);

  }
  cancel(): void {
    this.dialogRef.close();
  }
  getImageFile(ev) {
    console.log(ev);
    this.data.logo = ev;
}
}
