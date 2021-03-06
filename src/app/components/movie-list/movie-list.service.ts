import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  url = 'https://api.themoviedb.org/3/';
  apiKey = 'api_key=c6840fc358a1b989c04221e823e583d3';
  constructor(private http: HttpClient) { }

  HttpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application-json'
    })
  };

  getGenres(language): Observable<any> {
    return this.http.get<any>(this.url + 'genre/movie/list?' + this.apiKey + '&language=' + language);
  }

  getMoviesByGenre(language, page, genre, date): Observable<any> {
    return this.http.get<any>(this.url + 'discover/movie?' + this.apiKey + '&language=' + language + '&page='
    + page + '&with_genres=' + genre + '&primary_release_date.lte=' + date + '&sort_by=primary_release_date.desc');
  }
}


