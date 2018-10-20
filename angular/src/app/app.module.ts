import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { P404Component } from './p404.component';

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
    P404Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
