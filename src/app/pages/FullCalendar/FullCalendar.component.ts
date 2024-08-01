
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { QuizScheduleService } from '../../service/quiz-schedule/quiz-schedule.service';
import { QuizSchedule } from './quiz-schedule';
import { QuizzService } from '../../service/quizz-service/quizz.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './FullCalendar.component.html',
  styleUrls: ['./FullCalendar.component.css'],
  

})
export class CalendarComponent implements OnInit, AfterViewInit {

  calendar!: Calendar;

  constructor(private quizScheduleService: QuizScheduleService, private quizzService: QuizzService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loadQuizSchedules();
  }

  ngAfterViewInit(): void {
    this.initializeCalendar();
  }

  initializeCalendar(): void {
    this.calendar = new Calendar(this.elementRef.nativeElement.querySelector('#calendar'), {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth'
    });
    this.calendar.render();
  }

  loadQuizSchedules(): void {
    this.quizScheduleService.getAllScheduledQuizzes().subscribe(
      schedules => {
        schedules.forEach(schedule => {
          this.quizzService.getQuizById(schedule.quizId).subscribe(
            (quiz: any) => { // Specify the type of quiz as any
              this.calendar.addEvent({
                title: quiz.title,
                start: schedule.scheduledAt
              });
            },
            error => {
              console.error('Error fetching quiz:', error);
            }
          );
        });
      },
      error => {
        console.error('Error fetching quiz schedules:', error);
      }
    );
  }
}
