import { LayoutModule } from './../layout/layout.module';
import { MdModule } from './../shared/md.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MdModule,
    LayoutModule,
    FlexLayoutModule
  ]
})
export class NotFoundModule { }
