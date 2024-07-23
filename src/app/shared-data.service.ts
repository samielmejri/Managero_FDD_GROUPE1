import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private methodeSource = new BehaviorSubject<any>(null);
  currentMethode = this.methodeSource.asObservable();

  constructor() {}

  updateMethode(methode: any) {
    this.methodeSource.next(methode);
  }
}
