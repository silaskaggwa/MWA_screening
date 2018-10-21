import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  domain: string = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  retrieveExam(){
    return this.http.get(this.domain+'/exam/questions', { withCredentials: true });
  }
  postSnapshot(id, snapshot){
    return this.http.patch(this.domain+'/exam', { id, snapshot }, { withCredentials: true });
  }
}
