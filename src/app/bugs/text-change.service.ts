import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextChangeService {
  private countSource = new BehaviorSubject(0); // needs an initial value
  currentCount = this.countSource.asObservable();
 
  constructor() { }
 
  changeCounter(newValue: any) {
    this.countSource.next(newValue);
  }
}
