import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Genero } from 'src/app/classes/genero';
import { Filmes } from 'src/app/classes/filmes';
import { MainPageService } from './main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  constructor(public mainPageService: MainPageService) {
    this.loadGenres();
  }
   
  genres = {};
  movies = {};

  ngOnInit() {
  }

  loadGenres() {
    return this.mainPageService.getGenres('pt-BR').subscribe((data) => {
      this.genres = data.genres;        
    });
  };
  
  loadMoviesByGenre(genre: number) {
    return this.mainPageService.getMoviesByGenre('pt-BR', 1, genre).subscribe((data) => {
      this.movies = data.results;
      console.log(this.movies);
    });
  };
};
