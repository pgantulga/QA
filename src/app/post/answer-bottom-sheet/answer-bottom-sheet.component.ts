import { PermissionService } from './../../services/permission.service';
import { AuthService } from './../../services/auth.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'answer-bottom-sheet',
  templateUrl: './answer-bottom-sheet.component.html',
  styleUrls: ['./answer-bottom-sheet.component.scss']
})
export class AnswerBottomSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {id: any, title: any},
    private bottomSheetRef: MatBottomSheetRef<AnswerBottomSheetComponent>,
    public authService: AuthService,
    public permissionService: PermissionService,
  ) { }

  ngOnInit(): void {
  }

}
