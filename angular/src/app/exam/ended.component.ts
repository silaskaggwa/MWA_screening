import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ended',
  template: `
    <div>
      <h1>
        Exam Ended !
      </h1>
    </div>
  `,
  styles: ['div {position: relative; padding: 20%;} h1 {text-align: center;}']
})
export class EndedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
