import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {Observable} from "rxjs";
import {RouteService} from "../../services/route.service";
import {filter, map} from "rxjs/operators";
import {Location} from '@angular/common'

const AdminMenu = [
    {
        link: 'posts',
        name: 'Хэлэлцүүлгүүд'
    },
    {
        link: 'users',
        name: 'Хэрэглэгчид'
    },
    {
        link: 'tagCategories',
        name: 'Tags'
    }
];

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    topMenu: any;
    currentRoute: any;
    constructor(private route: ActivatedRoute, private routeService: RouteService, private router: Router, private location: Location) {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd))
            .subscribe((data: any) => {
                // console.log(data);
                this.currentRoute = data.url;
            });
    }
    ngOnInit(): void {
    }
    back(): void {
        this.location.back();
    }

}
