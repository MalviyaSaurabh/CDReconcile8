import { TestBed } from '@angular/core/testing';

import { CdrDataUploadService } from './cdr-data-upload.service';

describe('CdrDataUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CdrDataUploadService = TestBed.get(CdrDataUploadService);
    expect(service).toBeTruthy();
  });
});
