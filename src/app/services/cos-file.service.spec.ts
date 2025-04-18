import { TestBed } from '@angular/core/testing';

import { CosFileService } from './cos-file.service';

describe('CosFileService', () => {
  let service: CosFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
