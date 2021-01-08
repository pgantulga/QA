import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {take} from 'rxjs/internal/operators/take';
import {map, tap} from 'rxjs/operators';
import {AuthService} from "../services/auth.service";
import {SnackComponent} from "../shared/components/snack/snack.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
    }

    canActivate(): any {
        return this.authService.user$.pipe(
            take(1),
            map(user => !!(user && user.roles.admin)),
            tap(isAdmin => {
                if (!isAdmin) {
                    console.error('Access denied');
                    this.snackbar.openFromComponent(SnackComponent, {
                        data: 'Нэвтрэх эрхгүй байна.'
                    });
                    this.router.navigate(['/auth/login']);
                }
            })
        );
    }
}
