import { DialogComponent } from './../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../shared/components/snack/snack.component';
import { PermissionService } from "../services/permission.service";
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar,
    private permissionService: PermissionService,
    private postService: PostService,
    private dialog: MatDialog
  ) { }
  user: any;
  canActivate(route: ActivatedRouteSnapshot) {
    const obs = combineLatest([this.authService.user$, this.postService.getPost(route.params.id)]);
    const roles = ['member', 'moderator', 'admin'];
    return obs.pipe(
      map((values: any) => {
        this.user = values[0];
        const post = values[1];
        if (post.isSecret) {
          if (this.user) {
            for (const role of roles) {
              if ( this.user.roles[role]) {
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
          const dialogData = {
            title: 'Зөвхөн гишүүд нэвтрэх боломжтой.',
            content: 'Хэрвээ та эсвэл танай байгууллага МУУҮА-ийн гишүүн бол та өөрийн нэрийн хуудасны зургаа оруулж гишүүнээ баталгаажуулах боломжтой. '
          };
          const dialogRef = this.dialog.open(DialogComponent, {data: dialogData});
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['auth/profile-settings']);
            }
        });
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
