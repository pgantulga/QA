import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorUserComponent } from './moderator-user.component';

describe('ModeratorUserComponent', () => {
  let component: ModeratorUserComponent;
  let fixture: ComponentFixture<ModeratorUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
