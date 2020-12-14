import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyAddComponent } from './reply-add.component';

describe('ReplyAddComponent', () => {
  let component: ReplyAddComponent;
  let fixture: ComponentFixture<ReplyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
