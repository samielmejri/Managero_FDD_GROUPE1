import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HintService {
  private apiUrl = 'http://localhost:8080/bot/chat'; // Update the URL according to your backend endpoint

  constructor(private http: HttpClient) {}

  getHint(prompt: string): Observable<any> {
    const params = new HttpParams()

    .set('prompt', prompt)

    return this.http.get<string>(`${this.apiUrl}`, { params });
  }
}
