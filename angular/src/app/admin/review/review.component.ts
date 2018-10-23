import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service';
import { Router } from '@angular/router';

export interface Submission{
	_id: string,
	email: string,
	started_at: string,
	submitted_at: string
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

	private reviewList: Submission[] = [];

	displayedColumns: string[] = ['email', 'started_at', 'submitted_at'];
	constructor(private service: ReviewService, private router: Router) { }

  ngOnInit() {
		this.loadAllSubmission();
  }

	loadSubmission(submission: Submission){
		console.log("row>>", submission);
		this.router.navigate(['/admin/review/'+submission._id]);
	}
  loadAllSubmission(){
		this.service.getSubmissions()
			.subscribe(
				(data: Submission[]) => {
					console.log('db>> ', data);
					this.reviewList = data;
				}
			);
  }

}
