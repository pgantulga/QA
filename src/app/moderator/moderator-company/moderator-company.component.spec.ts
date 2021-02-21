import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorCompanyComponent } from './moderator-company.component';

describe('ModeratorCompanyComponent', () => {
  let component: ModeratorCompanyComponent;
  let fixture: ComponentFixture<ModeratorCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
