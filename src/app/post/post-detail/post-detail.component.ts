import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {PostService} from "../../services/post.service";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: any;

  constructor(public route: ActivatedRoute, private postService: PostService, public authService: AuthService) { }

  ngOnInit(): void {
    this.post = this.route.paramMap.pipe(
        switchMap( params => {
          return this.postService.getPost(params.get('id'));
        }));
  }



}
