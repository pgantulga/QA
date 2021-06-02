import { BlogService } from './../../services/blog.service';
import { config } from './../../shared/quill-config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.scss']
})
export class BlogAddComponent implements OnInit {
  blogForm: FormGroup;
  config: any;
  author: any;
  tags: any[] = [];
  editing = false;
  content = new FormControl('', [
    Validators.minLength(150)
  ]);
  title = new FormControl('', [
    Validators.required,
    Validators.maxLength(300)
  ]);

  constructor(
    private blogService: BlogService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) {
    this.config = config;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const dialogData = (!this.editing) ? { title: 'Нийтлэлийг нэмэх', content: ' Таны нийтлэлийг системд нэмэх гэж байна' }
      : { title: 'Сануулах уу', content: 'Таны өөрчлөлтийг сануулах гэж байна' };
    const snackData = (!this.editing) ? 'Шинэ нийтлэл нэмэгдлээ.' : 'Санагдлаа';
    const dialogRef = this.dialog.open(DialogComponent, { data: dialogData });
    return dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dialogPromise = (!this.editing) ? this.addBlog() : this.saveBlog();
        dialogPromise
          .then(() => {
            this.snackBar.openFromComponent(SnackComponent, { data: snackData });
            return this.router.navigate(['/blog']);
          });
      }
    });
  }

  private addBlog(): Promise<any> {
    return this.blogService.addBlog({
      title: this.title.value,
      content: this.content.value,
    }, this.author, this.tags)
  }
  private saveBlog(): Promise<any> {
    return this.blogService.saveBlog({
      title: this.title.value,
      content: this.content.value,
    }, this.author, this.tags)
   }

}
