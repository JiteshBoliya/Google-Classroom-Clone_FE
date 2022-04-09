import { TestBed } from '@angular/core/testing';

import { GoogleGapiService } from './google-gapi.service';

describe('GoogleGapiService', () => {
  let service: GoogleGapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleGapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
