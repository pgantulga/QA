import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
  exports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}},
              {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'never'}}, MatSidenav]
})
export class MdModule { }
