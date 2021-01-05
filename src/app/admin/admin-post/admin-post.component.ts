import { Component, OnInit } from '@angular/core';
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.css']
})
export class AdminPostComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
