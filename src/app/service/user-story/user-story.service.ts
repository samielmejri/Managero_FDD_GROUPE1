import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory } from '../../models/user-story.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
  private apiUrl = 'http://localhost:8089/userstories';

  constructor(private http: HttpClient) { }

  getUserStories(taskId: string): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.apiUrl}/task/${taskId}`);
  }

    
  createUserStory(userStory: UserStory, taskId: string): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.apiUrl}/task/${taskId}`, userStory);
  }
  
  updateUserStory(id: string, userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.apiUrl}/${id}`, userStory);
  }

  deleteUserStory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}