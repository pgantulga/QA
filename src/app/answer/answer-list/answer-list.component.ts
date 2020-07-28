import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  @Input() answer: any;

  constructor() { }

  ngOnInit(): void {
  }

}
