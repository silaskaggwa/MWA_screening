import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { P404Component } from './p404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { InterceptorModule } from './interceptor.module';
import { UnauthorizedComponent } from './unauthorized.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule,MatFormFieldModule,MatInputModule} from '@angular/material';
import { VerifyComponent } from './verify.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminGuard } from './admin/admin.guard';

const APP_ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'exam', loadChildren: './exam/exam.module#ExamModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [ AdminGuard ]},
  {path: 'staff', loadChildren: './staff/staff.module#StaffModule', canActivate: [ AdminGuard ]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: 'verify', component: VerifyComponent},
  {path: '404', component: P404Component},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  declarations: [
    AppComponent,
    VerifyComponent,
    HomeComponent,
    P404Component,
    UnauthorizedComponent
  ],
  
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    HttpClientModule,
    HttpModule,
    InterceptorModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
     
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  title = 'TAS'
}
