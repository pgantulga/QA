import { LayoutModule } from './../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoutingModule } from './create-routing.module';
import {PostAddComponent} from '../post/post-add/post-add.component';
import {MdModule} from '../shared/md.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {TagSelectComponent} from '../tag/tag-select/tag-select.component';


@NgModule({
    declarations: [PostAddComponent, TagSelectComponent],
    exports: [
        TagSelectComponent
    ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        MdModule,
        FlexLayoutModule,
        SharedModule,
        FormsModule,
        LayoutModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
    ]
})
export class CreateModule { }
