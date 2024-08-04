import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionPlay } from '../../pages/create-question/create-question.playload';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:8089/questions'; 

  constructor(private http: HttpClient) {}

  addQuestion(questionData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, questionData, { responseType: 'text' as 'json' });
  }
  
  updateQuestion (_id :string,questionPlay : QuestionPlay) {
    return this.http.put(`${this.apiUrl}/update/${_id}`, questionPlay)
  
  
   }

   getAllQuestions():Observable<any>{
    return this.http.get(this.apiUrl+'/all')
  }
  
  deleteQuestion(_id: string){
    return this.http.delete(`${this.apiUrl}/delete/${_id}`);
  }

}
