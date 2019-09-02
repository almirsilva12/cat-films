import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, generate } from 'rxjs';
import { Filmes } from './classes/filmes';
import { Genero } from './classes/genero';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = 'https://api.themoviedb.org/3/';
  api_key = 'api_key=c6840fc358a1b989c04221e823e583d3';

  constructor(private http: HttpClient) { }

  HttpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application-json'
    })
  }
  
  getGenres(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url + 'genre/movie/list?' + this.api_key);
  }

  getMovies(): Observable<Filmes[]> {
    return this.http.get<Filmes[]>(this.url + 'genres/movie/list?' + this.api_key);
  }
}
