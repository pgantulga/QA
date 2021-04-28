import { PostLogsComponent } from './post-logs/post-logs.component';
import { PostGuardService } from './post-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {PostAddComponent} from './post-add/post-add.component';
import { AuthGuard } from '../services/auth-guard.service';


const routes: Routes = [
    {
      path: '',
      component: PostDetailComponent,
      canActivate: [PostGuardService]
    },
    {
        path: 'edit',
        component: PostAddComponent
    },
    {
        path: 'logs',
        component: PostLogsComponent
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
