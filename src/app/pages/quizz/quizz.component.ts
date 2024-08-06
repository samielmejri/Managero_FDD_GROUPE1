import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { Subscription, interval } from 'rxjs';
import Swal from 'sweetalert2';
import { HintService } from '../../service/hint-service/hint.service';

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
  warningCount = 0;
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
      this.userId = state.userId;
      console.log(state);
    }
  }

  ngOnInit() {
    this.fetchQuestions();
    this.startTimer();
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
    if (!this.quizId) {
      console.error('Quiz ID is undefined!');
      return;
    }
  
    this.quizzService.fetchQuestions(this.quizId).subscribe(
      (questions: any) => {
        console.log('Fetched questions:', questions); // Log the raw response
        if (Array.isArray(questions)) {
          this.questions = questions;
          this.userAnswers = questions.map(() => ({ response: '' }));
        } else {
          console.error('Expected an array but received:', questions);
        }
      },
      (error) => {
        console.error('Failed to fetch questions:', error);
      }
    );
  }
    

  submitAnswers(): void {
    Swal.fire({
        title: 'Do you want to submit the quiz?',
        showCancelButton: true,
        confirmButtonText: `Submit`,
    }).then((result) => {
        if (result.isConfirmed) {
            const userId = this.userId;
            this.quizzService.submitAnswer(this.quizId, userId, this.userAnswers).subscribe({
                next: (response) => {
                    console.log('Submission successful:', response);
                    
                    // Assuming response is either a number or already a JavaScript object
                    let responseData;
                    try {
                        // Check if response is a JSON string (starts with { or [)
                        if (typeof response === 'string' && (response.startsWith('{') || response.startsWith('['))) {
                            responseData = JSON.parse(response);
                        } else {
                            // Otherwise, assume it's a number or object
                            responseData = response;
                        }
                    } catch (error) {
                        console.error('Parsing response failed', error);
                        return; // Exit if parsing failed
                    }

                    this.router.navigate(['/pages/submit-quizz/' + this.userId + '/' + this.quizId], {
                        state: {
                            responseData: responseData,  // Pass the data directly
                            totalQuestions: this.questions.length,
                            userId: this.userId,
                            quizId: this.quizId
                        }
                    });
                },
                error: (error) => {
                    console.error('Submission failed', error);
                }
            });
        }
    });
}
  
  selectAnswer(event: any): void {
    const selectedAnswer = event.target.value;
    this.userAnswers[this.currentQuestionIndex].response = selectedAnswer;
    console.log('Answer selected for question', this.currentQuestionIndex, 'is', selectedAnswer);
    console.log('Updated userAnswers:', this.userAnswers);
  }

  navigateToNextQuestion(): void {
    if (this.isAnswerSelected()) {
      this.currentQuestionIndex++;
    }
  }

  navigateToPreviousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  isAnswerSelected(): boolean {
    return !!this.userAnswers[this.currentQuestionIndex]?.response;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    Swal.fire("warning", "You can't right-click. If you do, your exam will be canceled!!", "warning");
    this.warningCount++;
    if (this.warningCount > 5) {
      console.log("warning count number is:" + this.warningCount);
      Swal.fire("warning", "This is your last warning. Now your exam will be automatically submitted!!", "warning");
    }
    event.preventDefault();
  }
}
