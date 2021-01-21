import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TagService} from '../../services/tag.service';
import {AdminCategoryAddComponent} from '../admin-category-add/admin-category-add.component';
import {SnackComponent} from '../../shared/components/snack/snack.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-tag',
  templateUrl: './admin-tag.component.html',
  styleUrls: ['./admin-tag.component.css']
})
export class AdminTagComponent implements OnInit {
  name: string;
  description: string;
  tags: any;
  allCategories$: Observable<any>
  constructor(private dialog: MatDialog, private snack: MatSnackBar, private tagService: TagService) { }

  ngOnInit(): void {
    this.allCategories$ = this.tagService.getAllTagCategories();
  }
  openDialog() {
    return this.dialog.open(AdminCategoryAddComponent, {
      width: '500px',
      data: {
        name: this.name,
        description: this.description,
        tags: this.tags
      },
    }).afterClosed().subscribe( res => {
      if (res) {
        this.tagService.createTagCategory(res)
            .then(() => {
              this.snack.openFromComponent(SnackComponent, {data: 'Category created'});
            });
      }
    });
  }
}
