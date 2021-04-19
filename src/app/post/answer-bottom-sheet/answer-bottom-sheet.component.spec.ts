import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerBottomSheetComponent } from './answer-bottom-sheet.component';

describe('AnswerBottomSheetComponent', () => {
  let component: AnswerBottomSheetComponent;
  let fixture: ComponentFixture<AnswerBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
