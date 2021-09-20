import { SnackComponent } from "./../../shared/components/snack/snack.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogComponent } from "./../../shared/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { PermissionService } from "./../../services/permission.service";
import { AuthService } from "./../../services/auth.service";
import { BlogService } from "./../../services/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { first, switchMap } from "rxjs/internal/operators";
import { DomSanitizer } from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';  


@Component({
  selector: "app-blog-detail",
  templateUrl: "./blog-detail.component.html",
  styleUrls: ["./blog-detail.component.scss"],
})
export class BlogDetailComponent implements OnInit {
  blog$: Observable<any>;
  htmlContent: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    public authService: AuthService,
    public permissionService: PermissionService,
    private dialogRef: MatDialog,
    private snack: MatSnackBar,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.blog$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.blogService.getBlog(params.get("id"));
      })
    );

    this.blog$.pipe(first()).subscribe((blog) => {
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(blog.content);
      this.meta.updateTag({name: 'og:title', content: blog.title})
    });
  }
  isBlogAuthor(user1, user2) {
    return user1.uid === user2.uid;
  }
  deleteBlog(blog) {
    return this.dialogRef
      .open(DialogComponent, {
        data: {
          title: "Устгах үйлдэл",
          content: "Та энэ нийтлэлийг устгахдаа бэлэн байна уу?",
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          return this.blogService.deleteBlog(blog.id).then(() => {
            this.router.navigate(["/blog"]);
            return this.snack.openFromComponent(SnackComponent, {
              data: "Нийтлэл устгагдлаа",
            });
          });
        }
      });
  }
}
