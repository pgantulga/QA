import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'tag-chip',
  templateUrl: './tag-chip.component.html',
  styleUrls: ['./tag-chip.component.scss']
})
export class TagChipComponent implements OnInit {
  @Input() item: any;
  type: string;
  user: any;
  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.user = await this.authService.getUser();
    if (this.user) {
      this.type = this.getTagType(this.item);
    }
  }
  getTagType(tag) {
    if (this.user.tags[tag.id]) {
      return 'user';
    }
  }

}
