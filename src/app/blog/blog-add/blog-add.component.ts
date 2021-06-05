import { PermissionService } from './../../services/permission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from './../../services/blog.service';
import { config } from './../../shared/quill-config';
import { FormGroup, FormBuilder, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
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
  oldValue: any;
  displayAs: any;
  displayUsers: any[] = [];
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
    public authService: AuthService,
    public permissionService: PermissionService
  ) {
    this.config = config;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.author = user;
      this.displayUsers = this.displayUsers.concat(
        [
          {
            displayName: this.author.displayName,
            type: 'user',
            id: this.author.uid
          },
          {
            displayName: this.author.company.name,
            type: 'company',
            id: this.author.company.id
          }]
      )
      this.displayAs = this.displayUsers[0];
    });
  }
  setDisplayUser(option) {
    this.displayAs = option;
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
  getTag(tag) {
    this.tags = [];
    tag.forEach(item => {
      this.tags.push(item);
    });
  }
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'Гарчиг шаардлагтай';
    }
    return this.title.hasError('length') ? '150 тэмдэгтэд багтаана уу' : '';
  }
  cancel(url) {
    const dialogData = {
      title: 'Цуцлах үйлдэл',
      content: ' Таны бичсэн агуулга хадгалагдахгүй.',
    };
    this.dialog.open(DialogComponent, { data: dialogData })
      .afterClosed().subscribe(result => {
        if (result) {
          this.title.setValue(null);
          this.content.setValue(null);
          return this.router.navigate([url]);
        }
      });
  }

  private addBlog(): Promise<any> {
    return this.blogService.addBlog({
      title: this.title.value,
      content: this.content.value,
    }, this.author, this.tags, this.displayAs)
  }
  private saveBlog(): Promise<any> {
    return this.blogService.saveBlog({
      title: this.title.value,
      content: this.content.value,
    }, this.author, this.tags, this.displayAs)
  }

}
