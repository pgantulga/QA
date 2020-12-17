import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {
  @Input() item: any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
