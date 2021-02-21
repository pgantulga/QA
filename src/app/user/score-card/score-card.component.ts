import { AuthService } from './../../services/auth.service';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {
  @Input() item;
  isUser: boolean;
  user: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    // this.getUser();
  }
  async getUser() {
    this.user = await this.authService.getUser();
    this.isUser = (this.user.uid === this.item.uid);
  }
}
