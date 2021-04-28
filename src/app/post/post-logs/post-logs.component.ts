import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-logs',
  templateUrl: './post-logs.component.html',
  styleUrls: ['./post-logs.component.scss']
})
export class PostLogsComponent implements OnInit {
  post$: any;
  logs$: any;

  constructor(
    public route: ActivatedRoute,
    private postService: PostService

  ) { }

  ngOnInit(): void {
    this.post$ = this.route.paramMap.pipe(
      switchMap(params => {
          this.logs$ = this.postService.getLogs(params.get('id'));
          return this.postService.getPost(params.get('id'));
      }));
  }

}
