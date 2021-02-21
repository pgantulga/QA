import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {take} from 'rxjs/internal/operators/take';
import {map, switchMap, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../shared/components/snack/snack.component';
import {PermissionService} from "../services/permission.service";
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostGuardService implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private permissionService: PermissionService,
    private postService: PostService
    ) { }
  canActivate(route: ActivatedRouteSnapshot){
    console.log(route.params)
    const roles = ['subscriber'];
    this.getPost(route.params.id);
    const obs = combineLatest([this.authService.user$, this.postService.getPost(route.params.id)]);
    obs.pipe(
      map(results => {
        console.log(results[0]);
        console.log(results[1]);
      })
    )
    return this.authService.user$.pipe(
        take(1),
        map((user) =>
          {
            for (const role of roles) {
              if (user.roles[role]) {
                return true;
              }
            }
          }
        ),
        tap(isSubscriber => {
          if (!isSubscriber) {
            console.error('Access denied');
            this.snackbar.openFromComponent(SnackComponent, {
                data: 'Зөвхөн бүртгэлтэй хэрэглэгчид нэвтрэх боломжтой.'
            });
            this.router.navigate(['/']);
          }
        })
    );
  }
  async getPost(id) {
    console.log(id)
    const post = await this.postService.getPost(id).toPromise;
    console.log(post);
  }
}
