import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorOverviewComponent } from './moderator-overview.component';

describe('ModeratorOverviewComponent', () => {
  let component: ModeratorOverviewComponent;
  let fixture: ComponentFixture<ModeratorOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
