import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { AdminGuard } from './admin.guard';
import { RouterModule } from '@angular/router';
import { MyMaterialModule } from  '../material.module';
import { QuestionsComponent } from './questions.component';


export const ADMIN_ROUTES = [
  {path:'', component: AdminComponent, canActivate: [ AdminGuard ]},
  {path:'questions', component: QuestionsComponent, canActivate: [ AdminGuard ]}
];

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
   
    RouterModule.forChild(ADMIN_ROUTES)
    
  ],
 // entryComponents: [AddUserComponent],
  declarations: [AdminComponent,QuestionsComponent],
  bootstrap: [AdminComponent]
})
export class AdminModule { }


