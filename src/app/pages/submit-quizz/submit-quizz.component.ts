import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Import here

@Component({
  selector: 'app-submit-quizz',
  templateUrl:'./submit-quizz.component.html',
  styleUrls: ['./submit-quizz.component.css'],
  

})
export class SubmitQuizzComponent {
  @ViewChild('certificateElement') certificateElementRef: ElementRef | null = null; // Initialize to null

  responseData!: number;
  totalQuestions!: number;
  userId!: string;
  quizId!: string;
  quizTitle!: string; // Add a property to store the quiz title


   constructor(private router: Router ,private quizzService: QuizzService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      const state = navigation.extras.state as { responseData: any, totalQuestions: number, userId: string,quizId:string };
      this.userId= state.userId
      this.totalQuestions = state.totalQuestions; 
      this.responseData = parseFloat(state.responseData); 
      this.quizId=state.quizId
      console.log(state)
     
    }

  }

  ngOnInit(): void {
    this.quizzService.getQuizById(this.quizId).subscribe((quiz: any) => {
      this.quizTitle = quiz.title; // Assuming 'title' is the property name for the quiz title
    });
  }
  generatePDF(): void {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      format: 'a4',
      unit: 'px',
    });
  
    // Resize and add background image from the web
    const backgroundImg = new Image();
    backgroundImg.crossOrigin = 'Anonymous'; // Required for CORS support
    backgroundImg.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHlnTSR4UzvXbfhSH96DjSbZKc4jRyh2S0W8qQa64wRw&s'; // Replace with the actual URL
  
    backgroundImg.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Failed to get 2D rendering context');
        return;
      }
      canvas.width = 595; // Adjust as needed
      canvas.height = 842; // Adjust as needed
      ctx.drawImage(backgroundImg, -20, -30, canvas.width, canvas.height);
  
      const imgData = canvas.toDataURL('image/jpeg');
  
      // Add background image to the PDF
      doc.addImage(imgData, 'JPEG', -100, -300, 780, 950);
  
      // Set font style and size
      doc.setFont('times');
      doc.setFontSize(18);
  
      // Set text color
      doc.setTextColor(0, 0, 0); // Black color
  
      // Add certificate title
      doc.text('Certificate of Completion', 100, 50);
  
      // Add user ID and quiz title
      doc.setFontSize(14);
      doc.text(`User ID: ${this.userId}`, 100, 80);
      doc.text(`Quiz Title: ${this.quizTitle}`, 100, 100);
  
      // Save the PDF
      doc.save('certificate.pdf');
    };
  }
  
  
  
}
