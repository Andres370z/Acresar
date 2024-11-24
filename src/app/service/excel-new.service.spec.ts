import { TestBed, inject } from '@angular/core/testing';

import { ExcelNewService } from './excel-new.service';

describe('ExcelNewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcelNewService]
    });
  });

  it('should be created', inject([ExcelNewService], (service: ExcelNewService) => {
    expect(service).toBeTruthy();
  }));
});
