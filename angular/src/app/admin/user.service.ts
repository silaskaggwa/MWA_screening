import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  domain: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  createUser(data){

      console.log('service has data-> :'+JSON.stringify(data));
      return this.http.post(this.domain+'/admin/user/create',data);//, { withCredentials: true });
  }

  getUser()
  {
    
    return this.http.get(this.domain+'/admin/user');//, { withCredentials: true });
  }
 
}