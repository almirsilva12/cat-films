import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class MainPageModule { 

}
