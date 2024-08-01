import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionPlay } from './create-question.playload';
import { QuizPlay } from './create-quiz.payload';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  providers: [QuizService],
  

})
export class QuestionListComponent implements OnInit {
  questions: QuestionPlay[] = [];
  quizId: string = '';

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizId = params['_id'] || ''; // Extract the quizId from queryParams
      if (!this.quizId) {
        console.error('Quiz ID is missing.');
        return;
      }
      this.loadQuestions(); // Load questions only if quizId is available
    });
  }
  
  loadQuestions() {
    this.quizService.getAllQuestions().subscribe((data: any) => {
      this.questions = data;
    });
  }
  addQuestionsToQuiz() {
    if (!this.quizId) {
      console.error('Quiz ID is missing.');
      return;
    }
  
  }}