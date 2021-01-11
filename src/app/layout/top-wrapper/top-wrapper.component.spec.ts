import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWrapperComponent } from './top-wrapper.component';

describe('TopWrapperComponent', () => {
  let component: TopWrapperComponent;
  let fixture: ComponentFixture<TopWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
