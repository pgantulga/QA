import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipe} from './moment.pipe';
import {TagModule} from '../tag/tag.module';



@NgModule({
  declarations: [MomentPipe],
  imports: [
    CommonModule,
  ],
  exports: [MomentPipe],
})
export class SharedModule { }
