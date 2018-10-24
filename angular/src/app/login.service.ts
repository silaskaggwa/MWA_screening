import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  domain: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  login(email){
    return this.http.post(this.domain+'/login',{email});//, { withCredentials: true });
  }

  getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

  isAuthorized(){
    if(this.getCookie('id_token')){
      return true;
    }
    return false;
  }

  logOut(){
    document.cookie = 'id_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  getQuestions()
  {
    //console.log('hi get question service');
    return this.http.get(this.domain+'/admin/questions');//, { withCredentials: true });

    //return this.http.get(this.domain+'/admin/questions/all');//, { withCredentials: true });
  }
 
}