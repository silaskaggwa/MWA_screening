import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service'
import { MatDialog, MAT_DIALOG_DATA, MatSlideToggleChange } from '@angular/material';

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
  //device:boolean = true;
  //to deactivate user
  color = 'accent';
  checked: number = 1;
  disabled = false;
  device: any = [];
  onChange(value) {
    console.log(this)
    if (value.checked === true) {
      this.checked = 1;
      console.log(1);
    } else {
      this.checked = 0;
      console.log(0);
    }
  }

  createUser(form: NgForm) {
    this.arr = form.value;
    this.userService.createUser(this.arr)
      .subscribe(resp => { console.log('resp>>', resp) })
    this.msg = "user is saved!";
    this.getUser();
  }
  getUser() {
    //console.log('users', this.userService.getUser());

    this.userService.getUser()
      .subscribe((data: User[]) => {
        console.log('users data', data);
        this.dataSource = data;
      }, err => { console.log('err', err.message) });

  }
  deactivateUser() {
    //to deactivate a user
  }

  displayedColumns: string[] = ['position', 'name', 'email', 'role', 'status'];
  // dataSource = ELEMENT_DATA;

}
