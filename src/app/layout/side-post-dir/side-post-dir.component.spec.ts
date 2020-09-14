import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePostDirComponent } from './side-post-dir.component';

describe('SidePostDirComponent', () => {
  let component: SidePostDirComponent;
  let fixture: ComponentFixture<SidePostDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePostDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidePostDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
