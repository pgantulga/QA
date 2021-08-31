import { TestBed } from '@angular/core/testing';

import { GlobalObjectService } from './global-object.service';

describe('GlobalObjectService', () => {
  let service: GlobalObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
