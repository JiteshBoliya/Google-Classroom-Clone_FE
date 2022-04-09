import { TestBed } from '@angular/core/testing';

import { ClasssrvService } from './classsrv.service';

describe('ClasssrvService', () => {
  let service: ClasssrvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasssrvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
