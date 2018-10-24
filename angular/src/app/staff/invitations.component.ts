import { Component, OnInit, OnDestroy} from '@angular/core';
import { InvitationsService } from './invitations.service';
import { Subscription } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

interface studentInfo {
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
  //newStatus: string = 'Pending';

  dataSource: studentInfo[];
  addApplicant: boolean = false;

  private subscription: Subscription;

  constructor(private invitationsService: InvitationsService){
    
  }

  ngOnInit(){
    this.getInfo();
  }
 
  unhide(){ this.addApplicant = !this.addApplicant; }

  getInfo() {
    // console.log('info', this.invitationsService.retrieveInfo());
    this.invitationsService.retrieveInfo()
      .subscribe((data:studentInfo[]) => {
        console.log('student info', data);
        this.dataSource =data;
      }, err => { console.log('err', err.message) });

  }

  send(){
    const info = { name: this.newName, email: this.newEmail }
    //console.log(info);
    this.invitationsService.sendInfo(info)
      .subscribe(response =>{
        console.log(response);
        this.getInfo();
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  displayedColumns: string[] = ['name', 'email', 'status'];
}