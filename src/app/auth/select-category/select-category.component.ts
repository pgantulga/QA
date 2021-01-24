import { Component, OnInit } from '@angular/core';
import {TagService} from "../../services/tag.service";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackComponent} from "../../shared/components/snack/snack.component";

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  categories$: Observable<any>;
  selectedCategories: any[];
  user: any;
  constructor(private tagService: TagService, public authService: AuthService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.selectedCategories = [];
    this.categories$ = this.tagService.getAllTagCategories();
  }
  onSelected(item, ev) {
    ev ? this.selectedCategories.push(item) : this.remove(item);
  }
  remove(item) {
    this.selectedCategories.splice(this.selectedCategories.indexOf(item), 1);
  }
  setCategories() {
    this.authService.getUser()
        .then(userData => {
          this.user = userData;
          return this.tagService.followCategoryTags(this.selectedCategories, this.user);
        })
        .then(() => {
          this.router.navigate(['home'])
              .then(() => {
                this.snack.openFromComponent(SnackComponent, {data: 'Тавтай морил!'});
              });
        });
  }
}
