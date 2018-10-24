import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material';

interface Snapshot {
    text: string
}

interface Question {
    question: string,
    progress: Snapshot[] 
}

interface ReviewData{
	_id: string,
    email: string,
    name: string,
	started_at: string,
    submitted_at: string,
    questions: Question[]
}

interface Status {
    status: string
}

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {

    private show_loader = false;
    private invitationId: string;

    private reviewData: ReviewData = {
        _id: '',
        email: '',
        name: '',
        started_at: '',
        submitted_at: '',
        questions: []
    };
    private numQuestions: number = 0;
    private numProgresses: number = 0;
    private numCurrSnapshot: number = 0;
    private numCurrQuestion: number = 0;
    private currentQuestion: Question = {question: '', progress: []};
    private currentSnapshot: Snapshot = {text: ''};

	constructor(private service: ReviewService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
        this.route.params.subscribe( params => {
            this.invitationId = params['id'];
        });
    }

    openSnackBar() {
        let config = new MatSnackBarConfig();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';
        config.duration = 2000;
        //config.extraClasses = this.addExtraClass ? ['test'] : undefined;
        this.snackBar.open('Review successful !', 'OK', config);
    }

    ngOnInit() {
        this.loadSubmission();
    }

    goToQuestion(n){
        const index = n-1;
        if(index >= 0 && index < this.numQuestions){
            this.numCurrQuestion = n;
            this.currentQuestion = this.reviewData.questions[index];
            this.numProgresses = this.currentQuestion.progress.length;
            if(this.currentQuestion.progress && this.numProgresses > 0){
                this.numCurrSnapshot = this.numProgresses;
                this.currentSnapshot = this.currentQuestion.progress[this.numCurrSnapshot - 1];
            }
        }
    }

    goToSnapshot(n){
        const index = n-1;
        if(index >= 0 && index < this.currentQuestion.progress.length){
            this.numCurrSnapshot = n;
            this.currentSnapshot = this.currentQuestion.progress[index];
        }
    }

	loadSubmission(){
        console.log("getSub>>", this.invitationId);
        this.show_loader = true;
		this.service.getSubmission(this.invitationId)
			.subscribe(
				(data: ReviewData) => {
                    console.log('db>> ', data.questions);
                    this.show_loader = false;
                    this.reviewData = data;
                    if(data.questions && data.questions.length > 0){
                        this.numCurrQuestion = 1;
                        this.numQuestions = data.questions.length
                        this.currentQuestion = data.questions[0];

                        if(this.currentQuestion.progress && this.currentQuestion.progress.length > 0){
                            this.numProgresses = this.currentQuestion.progress.length;
                            this.numCurrSnapshot = this.numProgresses; 
                            this.currentSnapshot = this.currentQuestion.progress[this.numCurrSnapshot - 1];
                        }
                    }
				}
			);
    }
    
    setPass(pass: boolean){
        this.show_loader = true;
        this.service.setPass(this.invitationId, pass)
            .subscribe(
                (info) => {
                    //this.show_loader = false;
                    this.openSnackBar();
                    setTimeout(()=>{
                        this.router.navigate(['/admin/review']);
                    },1500);
                }
            )
    }

}
