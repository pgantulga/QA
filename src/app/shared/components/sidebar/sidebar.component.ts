import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TagService} from '../../../services/tag.service';
@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  tags$: any;
  constructor(private route: ActivatedRoute, public tagService: TagService) { }
  ngOnInit(): void {
    this.tags$ = this.tagService.getPopularTags();
  }
}
