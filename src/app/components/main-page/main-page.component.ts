import { Component, OnInit } from '@angular/core';
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

  genres = [];

  ngOnInit() { }

  loadGenres() {
    return this.mainPageService.getGenres('pt-BR').subscribe((data: any) => {
      this.genres = data.genres;
      this.genres.forEach(element => {
        element.movies = this.loadMoviesByGenre(element.id);
      });
    });
  }

  loadMoviesByGenre(genre: number) {
    return this.mainPageService.getMoviesByGenre('pt-BR', 1, genre).subscribe((data) => {
      return data.results;
    });
  }
}
