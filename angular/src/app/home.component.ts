import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <h2>TAS Screening</h2>
        <span class="spacer"></span><span class="spacer"></span>
      </mat-toolbar-row>
    </mat-toolbar>
    <div>
      <h1>
        TAS Screening Login
      </h1>
      <mat-card class="my-card">
        <mat-card-content>
            <form class="my-form">
              <mat-form-field class="full-width">
                  <mat-label>Email</mat-label>
                  <input #myEmail matInput  placeholder="Email" name="email">
              </mat-form-field>
            </form>
        </mat-card-content>
        <mat-card-actions>
            <button mat-raised-button (click)="login(myEmail.value)" color="primary">LOGIN</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    div {position: relative; padding: 20%;} h1 {text-align: center;}
    .my-card {width: 300px; margin: auto;}
  `]
})
export class HomeComponent implements OnInit {

  constructor(private service: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.service.logOut();
  }

  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    //config.extraClasses = this.addExtraClass ? ['test'] : undefined;
    this.snackBar.open(message, 'OK', config);
  }

  login(email){
    this.service.login(email)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/verify']);
        },
        (err) => {
          this.openSnackBar('Email not authorized !');
        }
      )
  }
}
