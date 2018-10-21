import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { P404Component } from './p404.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { InvitationsService } from './invitations.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule,MatToolbarModule} from  '@angular/material';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'exam', loadChildren: './exam/exam.module#ExamModule'},
  {path: '404', component: P404Component},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    P404Component,
    InvitationsComponent
  ],
  imports: [
    MatButtonModule,MatToolbarModule,
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    InvitationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
