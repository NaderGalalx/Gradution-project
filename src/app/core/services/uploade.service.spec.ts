import { TestBed } from '@angular/core/testing';

import { UploadeService } from './uploade.service';

describe('UploadeService', () => {
  let service: UploadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
