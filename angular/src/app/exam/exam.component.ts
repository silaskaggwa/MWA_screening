import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExamService } from './exam.service';
import { SET_INVITATION_ID, INCREMENT_TIME_USED } from './redux/exam.actions';
import { Subscription, Subject } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './redux/exam.store';
import { Router } from '@angular/router';

interface Exam {
  id: string,
  name: string,
  email: string,
  questions: Array<any>,
  duration: number,
  time_used: number,
  time_away: number
}

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, OnDestroy {

  questions = [];
  private retrieveExamSubscription: Subscription;
  private examEndedSubscription: Subscription;
  show_loader: boolean = false;
  student_name: string = '';
  student_email: string = '';
  time_used: number = 0;
  time_away: number = 0;
  time_remaining: number = 0;
  duration: number = 0;
  theTimer;

  exam_ended = new Subject<Boolean>()

  constructor(private examService: ExamService, private ngRedux: NgRedux<IAppState>, private router: Router) { }

  startTimer(){
    setInterval(()=> {
      const timeRemaining = this.duration - this.time_used;
      if(timeRemaining <= 0){
        this.exam_ended.next(true);
        this.time_remaining = 0;
      }else{
        this.time_used++;
        this.ngRedux.dispatch({ type: INCREMENT_TIME_USED, increment: 1 });
        this.time_remaining = timeRemaining;
      }
    }, 1000);// 60000);
  }

  ngOnInit() {
    this.show_loader = true;
    this.examEndedSubscription = this.exam_ended.subscribe(
      (ended: Boolean) => {
        if(ended){
          console.log(">> Exam should end!!!");
          this.killTimer();
          this.lockExam();
        }
      }
    )
    this.retrieveExamSubscription = this.examService.retrieveExam()
      .subscribe(
        (data: Exam) => {
          this.student_name = data.name;
          this.student_email = data.email;
          this.questions = data.questions;
          this.time_used = data.time_used;
          this.time_away = data.time_away;
          this.duration = 15;//data.duration;
          this.time_remaining = data.duration - this.time_used;
          this.ngRedux.dispatch({ type: SET_INVITATION_ID, invitation_id: data.id });
          this.show_loader = false;
          this.theTimer = this.startTimer();
          if(this.time_remaining > 0){
            this.exam_ended.next(false);
          }else{
            this.exam_ended.next(true);
          }
          
        }
      )
  }

  killTimer(){
    clearInterval(this.theTimer);
  }
  ngOnDestroy(){
    this.retrieveExamSubscription.unsubscribe();
    this.examEndedSubscription.unsubscribe();
  }

  lockExam(){
    setTimeout(() => {
      this.router.navigate(['/exam/ended']);
    }, 1000);
  }
}
