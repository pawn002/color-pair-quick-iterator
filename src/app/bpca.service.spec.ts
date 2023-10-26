import { TestBed } from '@angular/core/testing';

import { BpcaService } from './bpca.service';

describe('BpcaService', () => {
  let service: BpcaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpcaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
