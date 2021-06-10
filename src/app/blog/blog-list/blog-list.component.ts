import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  @Input() item: any;
  htmlContent: any;
  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.item.content);

  }
  gotoBlog(blog) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      return this.router.navigate(['/blog', blog.id]);
    })
  }
}
