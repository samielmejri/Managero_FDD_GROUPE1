import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import * as annyang from 'annyang';

@Component({
  selector: 'app-start-quizz',
  templateUrl: './start-quizz.component.html',
  styleUrls: ['./start-quizz.component.css']
})
export class StartQuizzComponent implements OnInit {
  selectedQuizz: any;
  quizzes: any[] = [];
  showModal: boolean = false;

  constructor(private router: Router, private quizzService: QuizzService) { }

  ngOnInit(): void {
    this.quizzService.fetchQuizzes().subscribe(quizzes => {
      this.quizzes = quizzes;
    });
  }

  startQuiz(): void {
    if (this.selectedQuizz) {
      this.showModal = true; // Show webcam access modal
    } else {
      console.error("No quiz selected.");
    }
  }


  navigateToQuizzPage(): void {
    console.log("Selected quiz:", this.selectedQuizz);
    this.router.navigate(['/pages/quizz', this.selectedQuizz.category + '/' + this.selectedQuizz.title + '/' + this.selectedQuizz.userId], {
      state: { _id: this.selectedQuizz._id, userId: this.selectedQuizz.userId }
    });
  }


}
