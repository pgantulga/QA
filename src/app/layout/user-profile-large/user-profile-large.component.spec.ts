import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLargeComponent } from './user-profile-large.component';

describe('UserProfileLargeComponent', () => {
  let component: UserProfileLargeComponent;
  let fixture: ComponentFixture<UserProfileLargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileLargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
