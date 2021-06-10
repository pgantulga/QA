import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorBannerComponent } from './moderator-banner.component';

describe('ModeratorBannerComponent', () => {
  let component: ModeratorBannerComponent;
  let fixture: ComponentFixture<ModeratorBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
