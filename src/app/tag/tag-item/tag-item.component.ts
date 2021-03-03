import {Component, Input, OnInit} from '@angular/core';
import {TagService} from "../../services/tag.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() item: any;
  @Input() user: any;
  isUserTag: boolean;
  constructor(private tagService: TagService, private authService: AuthService) { }
  ngOnInit(): void {
    this.isUserTag = (this.user && this.user.tags[this.item.id]);
  }
}
