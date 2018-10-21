import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

  studentInfo = [
    {name: "Alem Embiale", email: "alemwatch@gmail.com"},
    {name: "Silas Kaggwa", email: "silas@gmail.com"},
    {name: "Tigist Tadesse", email: "tigist@gmail.com"},
    
  ];

  constructor() { }

  getStudentInfo(){
    return this.studentInfo;
  }
  
}
