import { TestBed, inject } from '@angular/core/testing';

import { TokenCheckserviceService } from './token-checkservice.service';

describe('TokenCheckserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenCheckserviceService]
    });
  });

  it('should be created', inject([TokenCheckserviceService], (service: TokenCheckserviceService) => {
    expect(service).toBeTruthy();
  }));
});
