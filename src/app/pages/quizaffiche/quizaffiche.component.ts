import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizPlay } from './create-quiz.payload';
import { QuestionPlay } from '../create-question/create-question.playload';
@Component({
  selector: 'app-quizaffiche',
  templateUrl: './quizaffiche.component.html',
  styleUrls: ['./quizaffiche.component.css'],
  providers: [QuizzService],
  

})
export class QuizafficheComponent implements OnInit {
  

  quizzes: QuizPlay[] = [];
  selectedQuiz: QuizPlay | null = null;
  editedQuiz: QuizPlay | null = null; // Removed
  currentPage: number = 1; // Current page number (default: 1)
  questions: QuestionPlay[] = []; 
  constructor(private quizService: QuizzService){}
  ngOnInit(): void {
    this.loadQuizzes();
  }
  loadQuizzes() {
    this.quizService.fetchQuizzes().subscribe((quizzes: QuizPlay[]) => {
      this.quizzes = quizzes;
      console.log('Quizzes fetched:', quizzes); // Log the received data for verification
    });
  }
  selectQuiz(quiz: QuizPlay) {
    this.selectedQuiz = quiz;
    this.fetchQuestions(quiz._id!);
  }

  fetchQuestions(_id: string) {
    this.quizService.fetchQuestions(_id).subscribe((questions: QuestionPlay[]) => {
      this.questions = questions;
      console.log('Questions for selected quiz:', questions);
    });
  }
  
}
