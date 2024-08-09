import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizPlay } from '../quiz-list/create-quiz.payload';
import Swal from 'sweetalert2';
import { Router,ActivatedRoute } from '@angular/router';




import { throwError } from 'rxjs';
import { QuestionService } from '../../service/question-service/question.service';
import { QuizService } from '../../quiz.service';
import { QuestionPlay } from '../create-question/create-question.playload';



import { QuizStatistics } from '../quiz-statistics/quiz-statistics';
import { Chart } from 'chart.js';





import { QuizScheduleService } from '../../service/quiz-schedule/quiz-schedule.service';
import { AfterViewInit, ElementRef } from '@angular/core';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  

})
export class HomepageComponent implements OnInit {
  quizzes: QuizPlay[] = [];
  updateForm: FormGroup;
  sselectedQuiz: string = '';
  selectedQuiz: QuizPlay | null = null ;
  currentStep: number = 1;

  createQuizForm: FormGroup;
  quizPayload: QuizPlay;



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




  editedQuiz: QuizPlay | null = null; // Removed
  currentPage: number = 1; // Current page number (default: 1)
  questions: QuestionPlay[] = []; 




  selectedQuestion: QuestionPlay | null = null;




  quizStatistics!: QuizStatistics;




  selectedQuizId: string | null = null;
  scheduledAt: string = '';
  scheduledDateTime: string='';



  constructor(private quizService: QuizzService,
    private quizzService: QuizzService,
     private formBuilder: FormBuilder,
     private router: Router,
     private questionService: QuestionService,
     private questionservice: QuestionService,
     private route: ActivatedRoute, 
     private quizScheduleService: QuizScheduleService,
     private elementRef: ElementRef
      ) {
    this.updateForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      numQ: ['', Validators.required]
    });


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
    this.loadQuizzes();
    this.loadQuestions();
    this.fetchQuizzes();
  }


  goToStep(step: number) {
    this.currentStep = step;
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
    this.router.navigate(['/pages/quizaffiche']);
  }  

  














  fetchQuizzes() {
    this.quizService.fetchQuizzes().subscribe(
        (data: any[]) => {
            this.quizzes = data;
        },
        (error) => {
            console.log('Error fetching quizzes:', error);
        }
    );
}

fetchQuizStatistics() {
    this.quizService.getQuizStatistics(this.sselectedQuiz).subscribe(
        (data: QuizStatistics) => {
            this.quizStatistics = data;
            this.createChart();
        },
        (error) => {
            console.log('Error fetching quiz statistics:', error);
        }
    );
}

createChart() {
    const ctx = document.getElementById('quizChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Average Score', 'Max Score', 'Min Score'],
            datasets: [{
                label: 'Quiz Statistics',
                data: [this.quizStatistics.averageScore, this.quizStatistics.maxScore, this.quizStatistics.minScore],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0.5
            }]
        },
        options: {
            scales: {
            }
        }
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