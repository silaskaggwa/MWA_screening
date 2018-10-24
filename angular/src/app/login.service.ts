import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  domain: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  login(email){
    return this.http.post(this.domain+'/auth',{email});//, { withCredentials: true });
  }

  getQuestions()
  {
    //console.log('hi get question service');
    return this.http.get(this.domain+'/admin/questions');//, { withCredentials: true });

    //return this.http.get(this.domain+'/admin/questions/all');//, { withCredentials: true });
  }
 
}