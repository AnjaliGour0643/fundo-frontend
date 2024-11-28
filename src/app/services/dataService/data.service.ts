import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private searchSource = new BehaviorSubject<string>('');
  incomingSearchText = this.searchSource.asObservable();

  constructor() {}

  updateSearchText(text: string): void {
    console.log('Updated search text:', text)
    this.searchSource.next(text); // Update the BehaviorSubject with the new search text
  }
}
