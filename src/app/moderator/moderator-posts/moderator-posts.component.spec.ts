import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorPostsComponent } from './moderator-posts.component';

describe('ModeratorPostsComponent', () => {
  let component: ModeratorPostsComponent;
  let fixture: ComponentFixture<ModeratorPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
