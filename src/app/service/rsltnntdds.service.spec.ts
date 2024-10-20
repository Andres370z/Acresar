import { TestBed } from '@angular/core/testing';

import { RsltnntddsService } from './rsltnntdds.service';

describe('RsltnntddsService', () => {
  let service: RsltnntddsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RsltnntddsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
