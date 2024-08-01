import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizPlay } from './create-quiz.payload';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css'],
  

})
export class CreateQuizComponent implements OnInit {
  createQuizForm: FormGroup;
  quizPayload: QuizPlay;

  constructor(private router: Router, private quizService: QuizzService) {
    this.createQuizForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      numQ: new FormControl('', Validators.required),
    });

    this.quizPayload = {
      category: '',
      numQ: 0,
      title: '',
    };
  }

  ngOnInit() {}

  createQuiz() {
    if (!this.createQuizForm || !this.quizPayload) {
      console.error('Form or payload not properly initialized.');
      return;
    }

    this.quizPayload.title = this.createQuizForm.get('title')?.value || '';
    this.quizPayload.category = this.createQuizForm.get('category')?.value || '';
    this.quizPayload.numQ = this.createQuizForm.get('numQ')?.value || 0;

    this.quizService.createQuiz(this.quizPayload).subscribe(
      (response) => {
        Swal.fire('Quiz Created Successfully', 'The quiz has been created successfully.', 'success');
        console.log('Quiz created successfully:', response);
      },
      (error) => {
        console.error('Error creating quiz:', error);
        // Log the complete error object for debugging
        console.error('Complete error:', error);
        Swal.fire('Quiz Created Successfully');
      }
    );
  }
}
