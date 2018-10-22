import { Component, OnInit, OnDestroy} from '@angular/core';
import { InvitationsService } from '../invitations.service';
import { Subscription } from 'rxjs';

interface studentInfo {
  id: string,
  name: string,
  email: string,
  status: string;
}

@Component({
  selector: 'invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})

export class InvitationsComponent implements OnInit, OnDestroy {
  
  newName: string = '';
  newEmail: string = '';
  newStatus: string = 'Pending';

  studentInfo;
  addApplicant: boolean = false;

  private subscription: Subscription;

  constructor(private invitationsService: InvitationsService){
    this.studentInfo = invitationsService.retrieveInfo();    
    this.studentInfo = invitationsService.getStudentInfo();
  }

  ngOnInit(){
    this.subscription = this.invitationsService.retrieveInfo()
      .subscribe((data: studentInfo) => {
        console.log(data); 
      })
  }
 
  unhide(){ this.addApplicant = !this.addApplicant; }

  send(){
    const info = {name: this.newName, email: this.newEmail, status: this.newStatus}
    //console.log(info);
    this.invitationsService.sendInfo(info)
      .subscribe(response =>{
        console.log(response);
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}


