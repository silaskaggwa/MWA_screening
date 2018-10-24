import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';

export interface Question {
  question: string;
  created_at: Date;
  active: boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styles: [`
    table {width: 100%;} table.th{text-align:center, font-weight:bold} label{color:green} .l-container {margin: 50px 10%;}
    .the-question {width: 50%;}
    .the-qn-status {width: 20%;}
  `]
})
export class QuestionsComponent implements OnInit {
  arr: any[] = [];
  msg: string;

  dataSource: Question[];
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }
  color = 'accent';
  checked: number = 1;
  disabled = false;
  device: any = [];
  onChange(value) {
    console.log(this)
    if (value.checked === true) {
      this.checked = 1;
      console.log(1);
    } else {
      this.checked = 0;
      console.log(0);
    }
  }
  addQuestion(form: NgForm) {
    this.arr = form.value
    console.log('value', JSON.stringify(form.value));
    this.questionService.addQuestion(this.arr).subscribe(
      resp => console.log('resp>>', resp)
    )
    this.msg = '  Question is saved!';
    this.getQuestions();
  }
  getQuestions() {
    this.questionService.getQuestions()
      .subscribe((data: Question[]) => {
        console.log('questions', data);
        this.dataSource = data;
      }, err => { console.log('err', err.message) });
  }
  displayedColumns: string[] = ['position', 'question', 'createdDate', 'active'];

}
