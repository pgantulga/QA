import { Banner } from './../../../services/banner.service';
import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'banner-add',
  templateUrl: './banner-add.component.html',
  styleUrls: ['./banner-add.component.scss']
})
export class BannerAddComponent implements OnInit {
  storagePath: string;
  constructor(
    public dialogRef: MatDialogRef<BannerAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Banner
  ) { 
    this.storagePath = `images/banners/${this.data.name}`;
  }

  ngOnInit(): void {

  }
  cancel() {
    this.dialogRef.close();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
  getImageFile(ev) {
    this.data.mediaUrl = ev;
  }
  closeDialog() {

    this.dialogRef.close(this.data);
  }

}
