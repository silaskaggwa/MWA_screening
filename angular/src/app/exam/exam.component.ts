import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamService } from './exam.service';
import { SET_INVITATION_ID } from './redux/exam.actions';
import { Subscription } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './redux/exam.store';

interface Exam {
  id: string,
  name: string,
  email: string,
  questions: Array<any>
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {

  questions = [];
  private subscription: Subscription;

  constructor(private examService: ExamService, private ngRedux: NgRedux<IAppState>) { }

  ngOnInit() {
    this.subscription = this.examService.retrieveExam()
      .subscribe(
        (data: Exam) => {
          //console.log("data>>", data);
          this.questions = data.questions;
          this.ngRedux.dispatch({ type: SET_INVITATION_ID, invitation_id: data.id });
        }
      )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
