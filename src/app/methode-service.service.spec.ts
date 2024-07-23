import { TestBed } from '@angular/core/testing';

import { MethodeServiceService } from './methode-service.service';

describe('MethodeServiceService', () => {
  let service: MethodeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
