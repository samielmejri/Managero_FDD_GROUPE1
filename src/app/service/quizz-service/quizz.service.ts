import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizStatistics } from '../../pages/quiz-statistics/quiz-statistics'; 
import { QuizPlay } from '../../pages/create-quiz/create-quiz.payload';
import { QuestionPlay } from '../../pages/create-question/create-question.playload';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {

  private apiUrl = 'http://localhost:8080/quiz'; 

  constructor(private http: HttpClient) {}

  fetchQuestions(_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getById/${_id}`);
  }

  fetchQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  submitAnswers(quizId: string, answers: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit/${quizId}`, answers);
  }
    submitAnswer(quizId: string, userId: string, answers: any[]): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/${quizId}/submit?userId=${userId}`, answers);
    }
    getQuizById(quizId: string){
      return this.http.get(`${this.apiUrl}/quizzez/${quizId}`);
      
    }
    getQuizStatistics(quizId: string): Observable<QuizStatistics> {
      return this.http.get<QuizStatistics>(`${this.apiUrl}/${quizId}/statistics`);
  }
  createQuiz(quizPayload: QuizPlay): Observable<any> {
    const params = new HttpParams()
      .set('category', quizPayload.category)
      .set('numQ', String(quizPayload.numQ))
      .set('title', quizPayload.title);
  
    return this.http.post<any>(`${this.apiUrl}/quiz/create`, {}, { params });
  }
  updateQuiz(quizId: string, updatedQuiz: QuizPlay): Observable<QuizPlay> {
    return this.http.put<QuizPlay>(`${this.apiUrl}/update/${quizId}`, updatedQuiz);
  }

  deleteQuiz(quizId: string){
    return this.http.delete(`${this.apiUrl}/delete/${quizId}`);
  }


}
