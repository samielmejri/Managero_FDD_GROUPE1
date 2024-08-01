import { TestBed } from '@angular/core/testing';

import { QuizscheduleService } from './quizschedule.service';

describe('QuizscheduleService', () => {
  let service: QuizscheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizscheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
