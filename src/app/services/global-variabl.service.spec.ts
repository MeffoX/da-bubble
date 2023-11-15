import { TestBed } from '@angular/core/testing';

import { GlobalVariablService } from './global-variabl.service';

describe('GlobalVariablService', () => {
  let service: GlobalVariablService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalVariablService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
