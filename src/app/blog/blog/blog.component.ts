import { Observable } from 'rxjs';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  allBlogs$: Observable<any>;
  constructor(
    private blogService: BlogService
  ) { 
    this.allBlogs$ = this.blogService.getAllBlogs();
  }

  ngOnInit(): void {
  }

}
