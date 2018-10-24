import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable()
export class InvitationsService {
  
  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  //For testing
  studentInfo = [
    {name: "Alem Embiale", email: "alemwatch@gmail.com", status: "Sent"},
    {name: "Silas Kaggwa", email: "silas@gmail.com", status: "Sent" },
    {name: "Tigist Tadesse", email: "tigist@gmail.com", status: "Pending"},
    
  ];

  //untile connected to backend
   getStudentInfo(){
    return this.studentInfo;
  }

  retrieveInfo(){
    //console.log("inside retriveInfo");
    return this.http.get(this.domain+'/info/');
  }

  sendInfo(info){
    this.studentInfo.push(info);
    return this.http.post(this.domain+'/staff', info);
  }
  
}
