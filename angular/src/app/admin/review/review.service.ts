import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  domain: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getSubmissions(){
    return this.http.get(this.domain+'/admin/submissions');//, { withCredentials: true });
  }

  getSubmission(invitatation_id){
    return this.http.get(this.domain+'/admin/submissions/'+invitatation_id);//, { withCredentials: true });
  }

  setPass(invitatation_id, pass: boolean){
    return this.http.post(this.domain+'/admin/submissions/'+invitatation_id, {pass});
  }
 
}