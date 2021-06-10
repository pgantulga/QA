import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHorizonComponent } from './banner-horizon.component';

describe('BannerHorizonComponent', () => {
  let component: BannerHorizonComponent;
  let fixture: ComponentFixture<BannerHorizonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerHorizonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerHorizonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
