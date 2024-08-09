import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { QuestionService } from '../../service/question-service/question.service';
import Swal from 'sweetalert2';
import { QuizService } from '../../quiz.service';
import { QuestionPlay } from './create-question.playload';



@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent  {

  questionForm = new FormGroup({
    questionTitle: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    option1: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    option2: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    option3: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    option4: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    rightAnswer: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    difficultyLevel: new FormControl('Easy', Validators.required),
    category: new FormControl('', Validators.required)
  });
  constructor(
    private questionService: QuestionService,
) {}

  difficultyLevels = ['Easy', 'Medium', 'Hard'];

  addQuestion() {
    if (!this.questionForm.valid) {
      console.error('Form is not valid.');
      return;
    }


    this.questionService.addQuestion(this.questionForm.value).subscribe(
      (data) => {
        console.log('Question successfully created:', data);
      },
      (error) => {
        throwError(error);
        console.error('Error creating question:', error);
      }
    );
  }
}
