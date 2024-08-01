import { TestBed } from '@angular/core/testing';

import { QuizzService } from '../../service/quizz-service/quizz.service';

describe('QuizzService', () => {
  let service: QuizzService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
