import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filme } from 'src/app/classes/filme';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  private movie = new Subject<Filme>();

  constructor() { }

  getMovie() {
    return this.movie.asObservable();
  }

  sendMovie(mv: Filme) {
    this.movie.next(mv);
  }
}
