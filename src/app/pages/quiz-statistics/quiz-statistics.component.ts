import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../service/quizz-service/quizz.service';
import { QuizStatistics } from './quiz-statistics';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-quiz-statistics',
    templateUrl: './quiz-statistics.component.html',
    styleUrls: ['./quiz-statistics.component.css'],
    

})
export class QuizStatisticsComponent implements OnInit {
    selectedQuiz: string = '';
    quizzes: any[] = []; // Define a variable to hold quiz data
    quizStatistics!: QuizStatistics;

    constructor(private quizService: QuizzService) { }

    ngOnInit(): void {
        this.fetchQuizzes();
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
        this.quizService.getQuizStatistics(this.selectedQuiz).subscribe(
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
    
}
