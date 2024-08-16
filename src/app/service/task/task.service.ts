import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8089/tasks';
  taskArchived: any;

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);  
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  archiveTask(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/archive`, {});  // Corrected the API method to POST
  }

  getArchivedTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/archived`);  // Corrected the API endpoint
  }

  restoreTask(id: string): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/${id}/restore`, {});  // Updated to use apiUrl
}

  
}
