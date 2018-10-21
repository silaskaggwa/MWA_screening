import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from './user.service'



export interface PeriodicElement {
  name: string;
  email: string;
  role: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Tigist', email:"tigist@gmail.com", role: 'Admin'},
  { name: 'Silas', email: "tigist@gmail.com", role: 'Admin-Staff'},
  { name: 'Alem', email: "tigist@gmail.com", role: 'Admin'},
  { name: 'Tigist', email: "tigist@gmail.com", role: 'Admin'},
  { name: 'Alem', email: "tigist@gmail.com", role: 'Admin'}
];
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
      <button mat-raised-button (click)="openDialog()" color="primary" >SAVE</button>
      <button mat-icon-button>
        <mat-icon aria-label="Example icon-button with a heart icon" >favorite</mat-icon>
      </button>
   </mat-card-actions>
  </form>

<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

<!-- Name Column -->
<ng-container matColumnDef="name">
  <th mat-header-cell *matHeaderCellDef> Name </th>
  <td mat-cell *matCellDef="let element"> {{element.name}} </td>
</ng-container>

<!-- Email Column -->
<ng-container matColumnDef="email">
  <th mat-header-cell *matHeaderCellDef> Email </th>
  <td mat-cell *matCellDef="let element"> {{element.email}} </td>
</ng-container>

<!-- Status Column -->
<ng-container matColumnDef="role">
  <th mat-header-cell *matHeaderCellDef> Role </th>
  <td mat-cell *matCellDef="let element"> {{element.role}} </td>
</ng-container>

<tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
<tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>



  </mat-card-content>
  </mat-card>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


 
  constructor(private userService: UserService) { 
  
  }

  ngOnInit() {
  }
  arr: any[]=[];  

  
  createUser(form : NgForm) {
    this.arr = form.value
    this.userService.createUser('hi');
    console.log('array', this.arr);
    console.log('value', JSON.stringify(form.value))
    
    
  }
  displayedColumns: string[] = [ 'name', 'email', 'role'];
  dataSource = ELEMENT_DATA;
}
