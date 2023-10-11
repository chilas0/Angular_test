import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {NgFor} from '@angular/common';


import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
  
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    NgFor,
   

    MatInputModule,
    HttpClientModule,
    NgOptimizedImage,
    


    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
