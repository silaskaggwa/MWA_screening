import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatCardModule,MatFormFieldModule,MatInputModule,MatRadioModule,MatListModule, MatToolbarModule} from  '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InvitationsComponent } from './invitations.component';
import { InvitationsService } from './invitations.service';
import { MyMaterialModule } from '../material.module';

export const STAFF_ROUTES = [
  {path:'', component: InvitationsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(STAFF_ROUTES),
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule, 
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MyMaterialModule
  ],
  providers: [InvitationsService],
  declarations: [
    InvitationsComponent
  ],
  bootstrap: [InvitationsComponent]
})
export class StaffModule { }
