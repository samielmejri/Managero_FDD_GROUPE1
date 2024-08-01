import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizPlay } from './pages/create-quiz/create-quiz.payload';
import { QuestionPlay } from './pages/create-question/create-question.playload';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private API_URL = 'http://localhost:8080';

  constructor(private HttpClient: HttpClient) { }

  getAllQuizzes(): Observable<any> { // Change the return type to Observable<any>
    return this.HttpClient.get<any>(this.API_URL + '/quiz/getAll');
  }
   createQuiz(quiz: any): Observable<any> {
    return this.HttpClient.post(this.API_URL+'/quiz/saveQuiz', quiz)
   }
   
/* createQuestion(){
  return this.HttpClient.get(this.API_URL++'/question/saveQuestion')

 }*/
 createQuestion(questionPayload: QuestionPlay): Observable<any> {
  return this.HttpClient.post(this.API_URL+'/question/saveQuestion', questionPayload)
 }
 getAllQuestions():Observable<any>{
  return this.HttpClient.get(this.API_URL+'/question')
}

deleteQuiz(_id: string){
  return this.HttpClient.delete(`${this.API_URL}/quiz/delete/${_id}`);
}

getQuizById(quizId: string){
  return this.HttpClient.get(`${this.API_URL}/${quizId}`);

}
addQuestionsToQuiz(_id: string, questions: QuestionPlay[]){
  return this.HttpClient.put<any>(`${this.API_URL}/quiz/${_id}/questions`, questions);
}

updateQuiz (_id :string,quizPlay : QuizPlay) {
  return this.HttpClient.put(`${this.API_URL}/quiz/update/${_id}`, quizPlay)

 }

 getQuestionsForQuiz(_id: string): Observable<QuestionPlay[]> {
  return this.HttpClient.get<QuestionPlay[]>(`${this.API_URL}/quiz/${_id}/questions`);
}
updateQuestion (_id :string,questionPlay : QuestionPlay) {
  return this.HttpClient.put(`${this.API_URL}/question/update/${_id}`, questionPlay)


 }
deleteQuestion(_id: string){
  return this.HttpClient.delete(`${this.API_URL}/question/delete/${_id}`);
}

}
