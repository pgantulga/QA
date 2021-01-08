import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {take} from 'rxjs/internal/operators/take';
import {map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../shared/components/snack/snack.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }
  canActivate(){
    return this.authService.user$.pipe(
        take(1),
        map(user => !!(user && user.roles.subscriber)),
        tap(isSubscriber => {
          if (!isSubscriber) {
            console.error('Access denied');
            this.snackbar.openFromComponent(SnackComponent, {
                data: 'Зөвхөн бүртгэлтэй хэрэглэгчид нэвтрэх боломжтой.'
            });
            // this.router.navigate(['/']);
          }
        })
    );
  }
}
