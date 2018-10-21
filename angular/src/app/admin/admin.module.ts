import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { RouterModule } from '@angular/router';
import { MyMaterialModule } from  '../material.module';


export const ADMIN_ROUTES = [
  {path:'', component: AdminComponent, canActivate: [ AdminGuard ]}
];

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule,
    RouterModule.forChild(ADMIN_ROUTES)
    
  ],
  declarations: [AdminComponent],
  bootstrap: [AdminComponent]
})
export class AdminModule { }


