import { TestBed } from '@angular/core/testing';

import { ColorMetricsService } from './color-metrics.service';

describe('ColorMetricsService', () => {
  let service: ColorMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
