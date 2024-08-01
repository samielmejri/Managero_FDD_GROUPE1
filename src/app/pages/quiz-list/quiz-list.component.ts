import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizPlay } from './create-quiz.payload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css'],
  

})
export class QuizListComponent implements OnInit {
  quizzes: QuizPlay[] = [];
  updateForm: FormGroup;
  selectedQuiz: QuizPlay | null = null;

  constructor(private quizService: QuizzService, private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      numQ: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  selectQuizForUpdate(quiz: QuizPlay) {
    this.selectedQuiz = quiz;
    this.updateForm.patchValue(quiz);
  }

  loadQuizzes() {
    this.quizService.fetchQuizzes().subscribe((quizzes: QuizPlay[]) => {
      this.quizzes = quizzes;
    });
  }

  updateQuiz() {
    const quizToUpdate = this.updateForm.value;
    const quizId = quizToUpdate._id;

    this.quizService.updateQuiz(quizId, quizToUpdate).subscribe(
      updatedQuiz => {
        Swal.fire('Quiz updated successfully');
        this.loadQuizzes(); // Reload quizzes after update
      },
      error => {
        console.error('Error updating quiz:', error);
      }
    );
  }

   deleteQuiz(quizId: string): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      () => {
        // Remove the deleted quiz from the list
        this.quizzes = this.quizzes.filter(quiz => quiz._id !== quizId);
        console.log('Quiz deleted successfully');
      },
      error => {
        console.error('Error deleting quiz:', error);
      }
    );

  }
  refreshPage() {
    window.location.reload();
  }

  }

