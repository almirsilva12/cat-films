import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, generate } from 'rxjs';
import { Filme } from './classes/filme';
import { Genero } from './classes/genero';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

}
