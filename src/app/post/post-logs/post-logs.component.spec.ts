import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLogsComponent } from './post-logs.component';

describe('PostLogsComponent', () => {
  let component: PostLogsComponent;
  let fixture: ComponentFixture<PostLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
