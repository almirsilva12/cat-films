import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, generate } from 'rxjs';
import { Filmes } from './classes/filmes';
import { Genero } from './classes/genero';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

}
