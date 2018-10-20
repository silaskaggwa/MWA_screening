import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamGuard } from './exam.guard';
import { RouterModule } from '@angular/router';

export const EXAM_ROUTES = [
  {path:'answer', component: ExamComponent, canActivate: [ ExamGuard ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EXAM_ROUTES)
  ],
  declarations: [
    ExamComponent
  ],
  bootstrap: [ExamComponent]
})
export class ExamModule { }
