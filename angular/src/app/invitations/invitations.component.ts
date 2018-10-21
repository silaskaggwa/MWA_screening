import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent{

  studentInfo = [
    {name: "Alem Embiale", email: "alemwatch@gmail.com"},
    {name: "Silas Kaggwa", email: "silas@gmail.com"},
    {name: "Tigist Tadesse", email: "tigist@gmail.com"},
    
  ];

  addApplicant(){
    this.studentInfo.push({name: "Feven Hailu", email: "feven@yahoo.com"});
    
  }

  
}
