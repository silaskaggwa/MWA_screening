import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//const UserService = require('../services/exam');

@Component({
  selector: 'admin',
  template: `
  <mat-toolbar>
  <span>Register</span>
  </mat-toolbar>
  <mat-card class="my-card">
   <mat-card-content>
      <form (ngSubmit)="createUser(f)" #f="ngForm" class="my-form">
          <mat-form-field class="full-width">
              <mat-label>Name</mat-label>
              <input ngModel name="fname" #fname="ngModel" matInput  placeholder="First name"  required>
            </mat-form-field>
         <mat-form-field class="full-width">
            <mat-label>Email</mat-label>
            <input  ngModel name="email" #fname="ngModel" matInput  placeholder="Email" required>
         </mat-form-field>
         <mat-form-field class="full-width">
            <mat-label>Role</mat-label>
            <input ngModel name="role" #role="ngModel" matInput  placeholder="role" required>
         </mat-form-field>     
   
   <mat-card-actions>
      <button mat-raised-button color="primary">SAVE</button>
   </mat-card-actions>
  </form>
  </mat-card-content>
  </mat-card>
  `,
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  arr: any[]=[];  

  createUser(form : NgForm) {
    this.arr = form.value
    console.log('array', this.arr);
    console.log('value', JSON.stringify(form.value))
   
    
  }
}
