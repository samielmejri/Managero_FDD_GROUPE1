import { TestBed } from '@angular/core/testing';

import { QuizScheduleService } from '../../service/quiz-schedule/quiz-schedule.service';
describe('QuizScheduleService', () => {
  let service: QuizScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
