import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http'
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Filmes } from '../../classes/filmes';
import { Genero } from 'src/app/classes/genero';


@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  
  url = 'https://api.themoviedb.org/3/';
  api_key = 'api_key=c6840fc358a1b989c04221e823e583d3';
  
  constructor(private http: HttpClient) { }

  HttpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application-json'
    })
  }

  getGenres(language): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url + 'genre/movie/list?' + this.api_key + '&language=' + language);
  }

  getMoviesByGenre(language, page, genre): Observable<Filmes[]> {
    return this.http.get<Filmes[]>(this.url + 'discover/movie?' + this.api_key + '&language=' + language + '$page=' + page + '$with_genres=' + genre.id);
  }
}


