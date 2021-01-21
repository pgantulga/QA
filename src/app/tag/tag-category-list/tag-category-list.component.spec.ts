import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCategoryListComponent } from './tag-category-list.component';

describe('TagCategoryListComponent', () => {
  let component: TagCategoryListComponent;
  let fixture: ComponentFixture<TagCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
