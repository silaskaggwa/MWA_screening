import { Component, OnInit, Input, NgModule } from '@angular/core';
import { InvitationsService } from '../invitations.service';


@Component({
  selector: 'invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent{
  
  @Input()studentInfo;
  addApplicant: boolean = false;

  constructor(private service: InvitationsService){
    this.studentInfo = service.getStudentInfo();
  }

 
  add(){
    this.addApplicant = true;
    
  }
  removeApplicant(){
    console.log("removing...");
  }

  send(){
    console.log("sending...");
  }

}


