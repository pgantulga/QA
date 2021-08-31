import { isPlatformBrowser } from '@angular/common';
import { GlobalObjectService } from './../../services/global-object.service';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface SheetData {
  body: string;
  title: string;
  link: any;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit {
  // window: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private router: Router,
    windowRef: GlobalObjectService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    // this.window = windowRef.getWindow();
  }

  ngOnInit(): void {}

  action(event) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      // this.window.location.href = this.data.link;
    }
  }
}
