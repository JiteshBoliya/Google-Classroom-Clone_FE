import { TestBed } from '@angular/core/testing';

import { StreamsrvService } from './streamsrv.service';

describe('StreamsrvService', () => {
  let service: StreamsrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamsrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
