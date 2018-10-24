import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuestionService } from './question.service';

export interface Question {
  question: string;
  active: boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './questions.component.html',
  styles: [`
    table {width: 100%;} label{color:green} .l-container {margin: 20px 10%;}
    .the-question {width: 80%;}
    .the-qn-status {width: 10%;}
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
  addQuestion(form: NgForm) {
    this.arr = form.value
    console.log('value', JSON.stringify(form.value));
    this.questionService.addQuestion(this.arr).subscribe(
      resp => console.log('resp>>', resp)
    )
    this.msg = '  Question is saved!';
  }
  getQuestions() {
    this.questionService.getQuestions()
      .subscribe((data: Question[]) => {
        console.log('questions', data);
        this.dataSource = data;
      }, err => { console.log('err', err.message) });
  }
  displayedColumns: string[] = ['question', 'active'];
  // dataSource = ELEMENT_DATA;
}
