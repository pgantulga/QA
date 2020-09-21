import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSidenavComponent } from './post-sidenav.component';

describe('PostSidenavComponent', () => {
  let component: PostSidenavComponent;
  let fixture: ComponentFixture<PostSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
