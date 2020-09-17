import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagsComponent} from './tags/tags.component';
import {TagDetailComponent} from './tag-detail/tag-detail.component';
import {TagAddComponent} from './tag-add/tag-add.component';


const routes: Routes = [
    {
      path: '',
      component: TagsComponent
    },
    {
        path: 'tagDetail/:tagId',
        component: TagDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
