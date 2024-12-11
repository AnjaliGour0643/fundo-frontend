import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchSource = new BehaviorSubject<string>('');
  incomingSearchText = this.searchSource.asObservable();

  constructor() {}

  private messageSource = new BehaviorSubject<string[]>([]);
  incomingData = this.messageSource.asObservable();

  outgoingData(message: any){
    console.log(message);
    this.messageSource.next(message)
  }
}
