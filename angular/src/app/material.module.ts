import { NgModule } from  '@angular/core';
import {MatNativeDateModule,MatIconModule,
    MatButtonModule,MatCheckboxModule, MatToolbarModule, 
    MatCardModule,MatFormFieldModule,MatDialogModule,MatSlideToggleModule, MatInputModule,MatRadioModule,MatListModule,MatGridListModule,MatTableModule} 
    from  '@angular/material';
import {MatDatepickerModule} from  '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
@NgModule({
imports: [MatNativeDateModule,MatDatepickerModule,MatIconModule,MatButtonModule,MatCheckboxModule, MatToolbarModule,FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],
 
exports: [MatNativeDateModule,FormsModule,
MatDatepickerModule,MatGridListModule,MatIconModule,MatDialogModule,MatSlideToggleModule,MatTableModule,MatButtonModule,MatCheckboxModule, MatToolbarModule, MatCardModule,MatFormFieldModule,MatInputModule,MatListModule,MatRadioModule,],
 
})
 
export  class  MyMaterialModule { }