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

  confirmUpdateQuiz() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to update this quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateQuiz();
      }
    });
  }

  updateQuiz() {
    const quizToUpdate = this.updateForm.value;
    const quizId = quizToUpdate._id;

    this.quizService.updateQuiz(quizId, quizToUpdate).subscribe(
      updatedQuiz => {
        Swal.fire('Quiz updated successfully');
        this.loadQuizzes(); // Reload quizzes after update
        this.selectedQuiz = null; // Reset selectedQuiz to show the edit button again
      },
      error => {
        console.error('Error updating quiz:', error);
      }
    );
  }

  confirmDeleteQuiz(quizId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteQuiz(quizId);
      }
    });
  }

  deleteQuiz(quizId: string): void {
    this.quizService.deleteQuiz(quizId).subscribe(
      response => {
        Swal.fire('Deleted!', 'Quiz has been deleted.', 'success');
        this.loadQuizzes(); // Refresh the quiz list after deletion
      },
      error => {
        console.error('Error deleting quiz:', error);
      }
    );
  }
}
