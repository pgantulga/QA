import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListGhostComponent } from './post-list-ghost.component';

describe('PostListGhostComponent', () => {
  let component: PostListGhostComponent;
  let fixture: ComponentFixture<PostListGhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListGhostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListGhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
