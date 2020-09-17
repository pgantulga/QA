import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostAddComponent} from './post-add/post-add.component';


const routes: Routes = [
    {
      path: '',
      component: PostDetailComponent
    },
    {
        path: 'edit',
        component: PostAddComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
