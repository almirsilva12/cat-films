import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Filmes } from '../classes/filmes';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(http: HttpClient) { }

}


