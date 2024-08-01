import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizScheduleService } from '../../service/quiz-schedule/quiz-schedule.service';
@Component({
  selector: 'app-schedule-quiz',
  templateUrl: './schedule-quiz.component.html',
  styleUrls: ['./schedule-quiz.component.css'],


})
export class QuizScheduleComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuizId: string | null = null;
  scheduledAt: string = '';
  scheduledDateTime: string='';

  constructor(
    private quizzService: QuizzService,
    private quizScheduleService: QuizScheduleService
  ) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizzService.fetchQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  scheduleQuiz(): void {
    if (!this.selectedQuizId || !this.scheduledAt) {
      console.error('Please select a quiz and scheduled date and time.');
      return;
    }
  
    // Concatenate scheduledAt with 'T' and add seconds and milliseconds
    this.scheduledDateTime = this.scheduledAt + ':00.00';
  
    // Call the scheduleQuiz() method with quizId and scheduledAt parameters
    this.quizScheduleService.scheduleQuiz(this.selectedQuizId, this.scheduledDateTime).subscribe(
      (response) => {
        console.log('Quiz scheduled successfully:', response);
        // Handle success response
      },
      (error) => {
        console.error('Error scheduling quiz:', error);
        // Handle error response
      }
    );
  }
  
}
