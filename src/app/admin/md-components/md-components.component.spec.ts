import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdComponentsComponent } from './md-components.component';

describe('MdComponentsComponent', () => {
  let component: MdComponentsComponent;
  let fixture: ComponentFixture<MdComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
