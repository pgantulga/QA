import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {map, take, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackComponent} from '../shared/components/snack/snack.component';

@Injectable({
  providedIn: 'root'
})
export class ModeratorGuard implements CanActivate {
  constructor(private authService: AuthService, private snackbar: MatSnackBar) { }
  canActivate(): any {
    return this.authService.user$.pipe(
        take(1),
        map(user => (user.roles.admin || user.roles.moderator)),
        tap( isModerator => {
          if (!isModerator) {
            return this.snackbar.openFromComponent(SnackComponent, {
              data: 'Та нэвтрэх эрхгүй байна.'
            });
          }
        })
    );
  }
}
