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
    }
];

@NgModule({
  imports: [
      // RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
      RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostRoutingModule { }
