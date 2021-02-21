import { MdModule } from './md.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipe} from './moment.pipe';
import {TagModule} from '../tag/tag.module';
import { UploadFileComponent } from './upload-file/upload-file.component';



@NgModule({
  declarations: [MomentPipe, UploadFileComponent],
  imports: [
    CommonModule,
    MdModule
  ],
  exports: [MomentPipe, UploadFileComponent],
})
export class SharedModule { }
