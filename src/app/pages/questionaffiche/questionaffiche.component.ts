import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { QuestionService } from '../../service/question-service/question.service';
import { QuestionPlay } from './create-question.playload';

@Component({
  selector: 'app-questionaffiche',
  templateUrl: './questionaffiche.component.html',
  styleUrls: ['./questionaffiche.component.css'],
  providers: [QuizService],
  


})
export class QuestionafficheComponent implements OnInit {
  questions: QuestionPlay[] = [];
  updateForm: FormGroup;
  selectedQuestion: QuestionPlay | null = null;

  constructor(
    private questionservice: QuestionService,
    private router: Router,
    private route: ActivatedRoute, private formBuilder: FormBuilder){
      this.updateForm = this.formBuilder.group({
        _id: [''],
        questionTitle: ['', Validators.required],
        option1: ['', Validators.required],
        option2: ['', Validators.required],
        option3: ['', Validators.required],
        option4: ['', Validators.required],
        rightAnswer: ['', Validators.required],
        difficultyLevel: ['', Validators.required],
        category: ['', Validators.required]

      })
    }
ngOnInit(): void {
  this.loadQuestions(); // Load questions only if quizId is available

}
loadQuestions() {
  this.questionservice.getAllQuestions().subscribe((data: any) => {
    this.questions = data;
  }); 
}
selectQuestionForUpdate(question: QuestionPlay) {
  this.selectedQuestion = question;
  this.updateForm.patchValue(question); // Pre-populate the form with selected question data
}
updateQuestion(_id: string | undefined) {
  if (!_id) {
    console.error('Question ID is undefined.');
    return;
  }

  const questionToUpdate = this.updateForm.value;
  questionToUpdate._id = _id;

  this.questionservice.updateQuestion(_id, questionToUpdate).subscribe(
    updatedQuestion => {
      console.log('Question updated:', updatedQuestion);
      Swal.fire("Question updated successfully");
      this.refreshPage();
    },
    error => {
      console.error('Error updating question:', error);
    }
  );
}
refreshPage() {
  window.location.reload();
}
deleteQuestion(questionId: string): void {
  this.questionservice.deleteQuestion(questionId).subscribe(
    () => {
      this.questions = this.questions.filter(question => question._id !== questionId);
      console.log('Question deleted successfully');
      Swal.fire("would you like to delete this question");

    },
    error => {
      console.error('Error deleting question:', error);
    }
  );
}
navigateToQuiz() {
  this.router.navigate(['/quizaffiche']);
}  
}