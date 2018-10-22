import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam.component';
import { ExamGuard } from './exam.guard';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { QuestionComponent } from './question.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { rootReducer, IAppState, INITIAL_STATE } from './redux/exam.store';
import { ExamService } from './exam.service';


export const EXAM_ROUTES = [
  {path:'', component: ExamComponent, canActivate: [ ExamGuard ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EXAM_ROUTES),
    MatCardModule,
    FlexLayoutModule,
    MatInputModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    NgReduxModule
  ],
  declarations: [
    ExamComponent,
    QuestionComponent
  ],
  providers: [ExamService],
  bootstrap: [ExamComponent]
})
export class ExamModule { 
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE);
  }
}
