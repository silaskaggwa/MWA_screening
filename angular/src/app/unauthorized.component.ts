import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <h2>TAS Screening</h2>
        <span class="spacer"></span><span class="spacer"></span>
      </mat-toolbar-row>
    </mat-toolbar>
    <div>
      <h1>
        UNAUTHORIZED !
      </h1>
    </div>
  `,
  styles: ['div {position: relative; padding: 20%;} h1 {text-align: center;}']
})
export class UnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
