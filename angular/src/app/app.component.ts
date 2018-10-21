import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
    <h2>TAS SCREENING</h2>
    <mat-toolbar color="primary">
  <mat-toolbar-row>
     <a mat-button routerLink="/home">HOME</a>
     <a mat-button routerLink="/admin">Register User</a>
     <span class="spacer"></span>
     <a mat-button routerLink="/login">Login</a>
  </mat-toolbar-row>
</mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
}
