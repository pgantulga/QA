import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {
  @Input() item;
  constructor() { }

  ngOnInit(): void {
  }

}
