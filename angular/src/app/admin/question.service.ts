import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class QuestionService {

  domain: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  addQuestion(data){

      console.log('Question service has data-> :'+JSON.stringify(data));
      return this.http.post(this.domain+'/admin/questions/create',data);//, { withCredentials: true });
  }

  getQuestions()
  {
    console.log('hi get question service');
   // return this.http.get(this.domain+'/admin/user/details');//, { withCredentials: true });
  }
 
}