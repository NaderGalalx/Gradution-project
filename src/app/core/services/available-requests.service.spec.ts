import { TestBed } from '@angular/core/testing';

import { AvailableRequestsService } from './available-requests.service';

describe('AvailableRequestsService', () => {
  let service: AvailableRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
