import { Company } from './../../../services/company.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagUpdateComponent } from 'src/app/tag/tag-update/tag-update.component';

@Component({
  selector: 'company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit{
  storagePath: string;

  constructor(public dialogRef: MatDialogRef<CompanyAddComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Company) {
                this.storagePath = `images/logos/${this.data.name}`;
  }
  ngOnInit(): void {
  }
  cancel(): void {
    this.dialogRef.close();
  }
  getImageFile(ev) {
    this.data.logo = ev;
}
}
