import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-p404',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <h2>TAS Screening</h2>
        <span class="spacer"></span><span class="spacer"></span>
      </mat-toolbar-row>
    </mat-toolbar>
    <div>
      <h1>
        404 Not Found !
      </h1>
    </div>
  `,
  styles: ['div {position: relative; padding: 20%;} h1 {text-align: center;}']
})
export class P404Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
