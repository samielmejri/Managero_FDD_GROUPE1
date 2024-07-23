import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodeServiceService {
  readonly apiUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) { }

  getMethode(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/methodes/getAll`);
  }

  getMethodes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/methodes/getAll`);
  }

  saveMethode(methode: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/methodes/${methode.id}`, methode);
  }
  

  deleteMethode(methodeId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/methodes/delete/${methodeId}`);
  }

  createMethode(methodePayload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/methodes/add`, methodePayload);
  }

// methode-service.service.ts
updateMethode(id: number, introductionData: string, advantagesData: string): Observable<any> {
  const body = {
    introduction: introductionData,
    advantages: advantagesData
  };
  return this.http.put<any>(`${this.apiUrl}/methodes/${id}`, body);
}
  }
