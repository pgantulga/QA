import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MdModule} from '../modules/md.module';
import { SidenavComponent } from './sidenav/sidenav.component';


@NgModule({
  declarations: [NavbarComponent, SidebarComponent, SidenavComponent],
  exports: [
    NavbarComponent,
    SidebarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
      MdModule,
      FlexLayoutModule
  ]
})
export class LayoutModule { }
