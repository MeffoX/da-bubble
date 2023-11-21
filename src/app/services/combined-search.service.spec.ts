import { TestBed } from '@angular/core/testing';

import { CombinedSearchService } from './combined-search.service';

describe('CombinedSearchService', () => {
  let service: CombinedSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinedSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
