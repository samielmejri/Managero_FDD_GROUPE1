import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStory } from '../../models/user-story.model';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {
  private apiUrl = 'http://localhost:8089/user-stories';  // Corrected the base API URL

  constructor(private http: HttpClient) { }

  getUserStories(taskId: string): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.apiUrl}/${taskId}`);  // Corrected the endpoint to match backend
  }

  createUserStory(userStory: UserStory, taskId: string): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.apiUrl}?taskId=${taskId}`, userStory);  // Corrected the endpoint
  }

  updateUserStory(id: string, userStory: UserStory): Observable<UserStory> {
    return this.http.put<UserStory>(`${this.apiUrl}/${id}`, userStory);
  }

  deleteUserStory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.apiUrl);  
  }

  archiveUserStory(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/archive`, {});  
  }

  getArchivedUserStories(): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(`${this.apiUrl}/archived`);  
  }

  restoreUserStory(id: string): Observable<UserStory> {
    return this.http.post<UserStory>(`${this.apiUrl}/${id}/restore`, {});  


  }
}