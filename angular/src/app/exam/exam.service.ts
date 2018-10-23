import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './redux/exam.store';

@Injectable()
export class ExamService {

  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  retrieveExam(){
    return this.http.get(this.domain+'/progress/questions', { withCredentials: true });
  }
  postSnapshot(qn_id, snapshot, qn_duration){
    const time_away = this.ngRedux.getState().time_away;
    const time_used = this.ngRedux.getState().time_used;
    return this.http.patch(this.domain+'/progress', { qn_id, snapshot, qn_duration, time_used, time_away }, { withCredentials: true });
  }

  endExam(){
    const time_away = this.ngRedux.getState().time_away;
    const time_used = this.ngRedux.getState().time_used;
    const submit = true;
    return this.http.patch(this.domain+'/progress/end', { submit, time_used, time_away }, { withCredentials: true });
  }
}
