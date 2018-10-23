import { Component, OnInit, OnDestroy} from '@angular/core';
import { InvitationsService } from './invitations.service';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  question: string;
  active: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { question: 'what is last name of Tigist?', active: true },
  { question: 'what is last name of Silas?', active: true },
  { question: 'what is last name of Alem?', active: true },

];

@Component({
  selector: 'invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})

export class InvitationsComponent implements OnInit {
  
  arr: any[] = [];
  msg: string;
  constructor() { }

  ngOnInit() {
  }
  addQuestion() {
    
    
    this.msg = '  Question is saved!';
  }

  displayedColumns: string[] = ['question', 'active'];
  dataSource = ELEMENT_DATA;
}


