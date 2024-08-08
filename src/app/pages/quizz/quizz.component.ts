import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { initFlowbite } from 'flowbite';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { HintService } from '../../service/hint-service/hint.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: any[] = [];
  category: string = '';
  userId!: string;

  quizId!: string;
  timerSubscription!: Subscription;
  timer: number = 0;
  totalTime: number = 1000;
  warningCount=0;
  videoStream: MediaStream | null = null;
  @ViewChild('videoElement', { static: true }) videoElementRef!: ElementRef<HTMLVideoElement>;

  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
    private router: Router,
    private hintService: HintService // Inject the HintService

  ) {
    this.startWebcam();
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { _id: string, userId: string }; // Get userId from state
      this.quizId = state._id;
      this.userId= state.userId
      console.log(state);
 
    }
  }

  ngOnInit() {
    this.fetchQuestions();
    initFlowbite();
    this.startTimer();
    this.fetchHintsForQuestions();
  }


  async fetchHintsForQuestions() {
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      this.hintService.getHint(question.questionTitle).subscribe(hint => {
        console.log('Hint for question:', question.questionTitle, hint.hint); // Access the hint directly from the emitted value
        // You can store the hint in your component or display it to the user
      });
    }
  }

  showHint(): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.hintService.getHint(currentQuestion.questionTitle).subscribe(hint => {
      // Display the hint using SweetAlert2
      Swal.fire({
        title: 'Hint for Question ' + (this.currentQuestionIndex + 1),
        text: hint.hint, // Access the 'hint' property
        icon: 'info',
        confirmButtonText: 'OK'
      });
    });
  }
  

  stopWebcam(): void {  
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
      this.videoStream = null;
    }
  }

  startWebcam(): void {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.videoStream = stream;
          this.videoElementRef.nativeElement.srcObject = this.videoStream;
          this.videoElementRef.nativeElement.addEventListener('loadedmetadata', () => {
            this.videoElementRef.nativeElement.play();
          });
        })
        .catch((error) => {
          console.log('Error starting webcam:', error);
        });
    }
  }
  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timer < this.totalTime) {
        this.timer++;
      } else {
        this.stopTimer();
        this.submitAnswers(); // Call submitAnswers() after timer ends
      }
    });
  }
  ngOnDestroy() {
    this.stopTimer();
  }
  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  fetchQuestions(): void {
    this.quizzService.fetchQuestions(this.quizId).subscribe((questions: any[]) => {
      this.questions = questions;
    });
  }
  submitAnswers(): void {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
     
      showCancelButton: true,
      confirmButtonText: `Submit`,
     
    })
    this.handleAnswer(this.userAnswers[this.currentQuestionIndex]);
    const userId = this.userId; // Assuming userId is stored in this.userId
  
    this.quizzService.submitAnswer(this.quizId, userId, this.userAnswers).subscribe({
      next: (response) => {
        try {
          const responseData = JSON.parse(response); // Try to parse the response
          this.router.navigate(['/pages/submit-quizz'+'/'+this.userId+'/'+this.quizId], { state: { 
            responseData: responseData,
            totalQuestions: this.questions.length,
            userId:this.userId,
             quizId:this.quizId

          } });
        } catch (error) {
          console.error('Parsing response failed', error);
        }
      },
      error: (error) => {
        console.error('Submission failed', error);
      }
    });
    
  }
  

  handleAnswer(selectedAnswer: string): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const answer = {
      _id: currentQuestion._id,
      response: selectedAnswer
    };
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  navigateToNextQuestion(): void {
    this.handleAnswer(this.userAnswers[this.currentQuestionIndex]);
    this.currentQuestionIndex++;
  } 

  navigateToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  } 

  prepareAnswersForSubmission() {
    return this.questions.map((question, index) => ({
      _id: question._id,
      response: this.userAnswers[index]
    }));
  }
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    Swal.fire("warning", "You can't right-click. If you do, your exam will be canceled!!", "warning");
    this.warningCount++;
    if (this.warningCount > 5) {
      console.log("warning count number is:" + this.warningCount);
     // this.submitAnswers();
      Swal.fire("warning", "This is your last warning. Now your exam will be automatically submitted!!", "warning");

    }
    event.preventDefault();
  }
  
 

}
