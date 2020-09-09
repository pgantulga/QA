import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from "../services/menu.service";
import {Menu} from "../interfaces/Menu";
import {AuthService} from "../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from '../shared/dialog/dialog.component';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {RouteService} from '../services/route.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  @Input() layout: any;
  topMenu: Menu[];
  constructor( public menu: MenuService, public authService: AuthService, public dialog: MatDialog, public router: Router) {}
  ngOnInit(): void {
    this.topMenu = this.menu.topMenu;
  }
  signOut() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {title: 'Системээс гарах' , content: 'Та системээс гарахдаа итгэлтэй байна уу?'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.authService.signOut()

          .then(() => console.log('Signed out'));
      }
    });

  }
}
