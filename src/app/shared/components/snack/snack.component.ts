import {Component, Inject} from '@angular/core';
import {MatSnackBarRef, MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss']
})
export class SnackComponent {
  constructor(public snackBarRef: MatSnackBarRef<SnackComponent>,
              @Inject (MAT_SNACK_BAR_DATA) public data: any) { }
}
