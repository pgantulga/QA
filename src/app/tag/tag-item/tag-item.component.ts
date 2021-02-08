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
  isUserTag: boolean;
  constructor(private tagService: TagService, private authService: AuthService) { }
  ngOnInit(): void {
    this.checkUserTag();
  }
  async checkUserTag() {
    const user = await this.authService.getUser();
    if (user) {
      this.isUserTag = user.tags[this.item.id];
    }
  }
}
