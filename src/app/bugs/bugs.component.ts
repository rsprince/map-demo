import { Component, OnInit } from '@angular/core';
import { TextChangeService } from './text-change.service'

@Component({
  selector: 'bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {
  count: number = 0;
  observableCount: any;

  constructor(
    private textChangeService: TextChangeService
  ) { }

  ngOnInit(): void {
    // Subscribe to current count (get last value)
    this.textChangeService.currentCount
    .subscribe(data => this.observableCount = data)
  }

  increaseCount() {
    this.count++;
  }

  increaseObservableCount() {
    let newCount = this.observableCount;
    newCount++;
    // Set 'next' value of the behavior subject
    this.textChangeService.changeCounter(newCount);
  }

}
