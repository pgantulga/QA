import { TestBed } from '@angular/core/testing';

import { PostGuardService } from './post-guard.service';

describe('PostGuardService', () => {
  let service: PostGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
