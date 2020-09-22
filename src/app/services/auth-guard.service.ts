import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {take} from 'rxjs/internal/operators/take';
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router ) { }
  canActivate(){
    return this.authService.user$.pipe(
        take(1),
        map(user => !!(user && user.roles.admin)),
        tap(isAdmin => {
          if (!isAdmin) {
            console.error('Access denied');
            this.router.navigate(['/']);
          }
        })
    );
  }
}
