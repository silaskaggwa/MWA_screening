import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service'
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

interface User {
  _id: string,
  name: string,
  email: string,
  role: string,
  active: boolean
}
export interface PeriodicElement {
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const ELEMENT_DATA: User[] = [
  { _id: '1', name: 'Tigist', email: "tigist@gmail.com", role: 'Admin', active: true },
  { _id: '1', name: 'Silas', email: "tigist@gmail.com", role: 'Admin-Staff', active: true },
  { _id: '1', name: 'Alem', email: "tigist@gmail.com", role: 'Admin', active: true },
  { _id: '1', name: 'Tigist', email: "tigist@gmail.com", role: 'Admin', active: false },
  { _id: '1', name: 'Alem', email: "tigist@gmail.com", role: 'Admin', active: false }
];
@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getUser()
  }
  arr: any[] = [];
  msg: string;
  dataSource: User[];
  openDialog() {

    console.log('tg dialog');
    // this.dialog.open(AddUserComponent);

  }
  createUser(form: NgForm) {
    this.arr = form.value;
    this.userService.createUser(this.arr)
      .subscribe(resp => { console.log('resp>>', resp) })
    this.msg = "user is saved!";
  }
  getUser() {
    //console.log('users', this.userService.getUser());

    this.userService.getUser()
      .subscribe((data:User[]) => {
        console.log('users data', data);
        this.dataSource =data;
      }, err => { console.log('err', err.message) });

  }

  displayedColumns: string[] = ['name', 'email', 'role', 'status'];
 // dataSource = ELEMENT_DATA;

}
