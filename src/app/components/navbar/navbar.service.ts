import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from 'src/app/classes/genero';


@Injectable({
  providedIn: 'root'
})
export class NavbarService {

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
}


