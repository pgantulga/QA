import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorTagsComponent } from './moderator-tags.component';

describe('ModeratorTagsComponent', () => {
  let component: ModeratorTagsComponent;
  let fixture: ComponentFixture<ModeratorTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
