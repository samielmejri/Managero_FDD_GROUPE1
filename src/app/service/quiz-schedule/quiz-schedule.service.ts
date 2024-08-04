import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizSchedule } from '../../pages/FullCalendar/quiz-schedule';

@Injectable({
  providedIn: 'root'
})
export class QuizScheduleService {
  private apiUrl = 'http://localhost:8089/quiz-schedules';

  constructor(private http: HttpClient) { }

  getAllScheduledQuizzes(): Observable<QuizSchedule[]> {
    return this.http.get<QuizSchedule[]>(`${this.apiUrl}/all`);
  }

  scheduleQuiz(quizId: string, scheduledAt: string): Observable<any> {
    // Format the scheduledAt string to match the expected format
    const formattedScheduledAt = this.formatScheduledAt(scheduledAt);
    
    // Send the request with the formatted date
    const params = new HttpParams()
      .set('quizId', quizId)
      .set('scheduledAt', formattedScheduledAt);

    return this.http.post<any>(`${this.apiUrl}/quizschedule`, null, { params });
  }

  private formatScheduledAt(scheduledAt: string): string {
    // Convert the scheduledAt string to a Date object
    const date = new Date(scheduledAt);
    
    // Format the date to match the expected format: yyyy-MM-ddTHH:mm:ss.SSS
    const formattedDate = date.toISOString().split('.')[0] + '.00';
    
    return formattedDate;
  }

  
}
