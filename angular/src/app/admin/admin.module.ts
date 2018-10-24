import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { AdminGuard } from './admin.guard';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MyMaterialModule } from  '../material.module';
import { MatRippleModule } from '@angular/material/core';
import { QuestionsComponent } from './questions.component';
import { ReviewComponent } from './review/review.component';
import { ReviewService } from './review/review.service';
import { ProgressComponent } from './review/progress.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule, MatProgressBarModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const ADMIN_ROUTES = [
  {path:'', component: AdminComponent, canActivate: [ AdminGuard ]},
  {path:'questions', component: QuestionsComponent, canActivate: [ AdminGuard ]},
  {path:'review', component: ReviewComponent, canActivate: [ AdminGuard ]},
  {path:'review/:id', component: ProgressComponent, canActivate: [ AdminGuard ]},
];

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    MatRippleModule,
    FlexLayoutModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule.forChild(ADMIN_ROUTES)
    
  ],
 // entryComponents: [AddUserComponent],
  declarations: [AdminComponent,QuestionsComponent,ReviewComponent,ProgressComponent],
  bootstrap: [AdminComponent],
  providers: [ReviewService]
})
export class AdminModule { }


