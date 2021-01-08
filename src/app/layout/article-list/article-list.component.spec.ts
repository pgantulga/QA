import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLstComponent } from './article-lst.component';

describe('ArticleLstComponent', () => {
  let component: ArticleLstComponent;
  let fixture: ComponentFixture<ArticleLstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
