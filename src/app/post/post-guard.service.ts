import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/internal/operators/take';
import { map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../shared/components/snack/snack.component';
import { PermissionService } from "../services/permission.service";
import { combineLatest } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private permissionService: PermissionService,
    private postService: PostService
  ) { }
  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route.params);
    const obs = combineLatest([this.authService.user$, this.postService.getPost(route.params.id)]);
    const roles = ['member', 'moderator', 'admin'];
    return obs.pipe(
      map((values: any) => {
        const user = values[0];
        const post = values[1];
        if (post.isSecret) {
          if (user) {
            for (const role of roles) {
              if ( user.roles[role]) {
                return true;
              }
            }
          }
        } else {
          return true;
        }
      }
      ),
      tap(isSubscriber => {
        if (!isSubscriber) {
          console.error('Access denied');
          this.snackbar.openFromComponent(SnackComponent, {
            data: 'Зөвхөн гишүүд нэвтрэх боломжтой.'
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
