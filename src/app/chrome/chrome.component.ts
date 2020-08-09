import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chrome',
  templateUrl: './chrome.component.html',
  styleUrls: ['./chrome.component.scss']
})
export class ChromeComponent implements OnInit {
  navBarShow = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavBar() {
    this.navBarShow = !this.navBarShow;
  }

}
