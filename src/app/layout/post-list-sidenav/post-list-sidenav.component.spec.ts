import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListSidenavComponent } from './post-list-sidenav.component';

describe('PostListSidenavComponent', () => {
  let component: PostListSidenavComponent;
  let fixture: ComponentFixture<PostListSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
