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
  imgUrl = 'https://image.tmdb.org/t/p/w780';
  genres = [];

  ngOnInit() {
    console.log(this.genres);
   }

  loadGenres() {
    return this.mainPageService.getGenres('pt-BR').subscribe((data: any) => {
      this.genres = data.genres;
      this.genres.forEach(element => {
        this.loadMoviesByGenre(element.id);
      });
    });
  }

  loadMoviesByGenre(genre) {
    return this.mainPageService.getMoviesByGenre('pt-BR', 1, genre).subscribe((data) => {
      const movies = data.results;
      console.log(movies);
      movies.forEach(mv => {
        mv.poster_path = this.imgUrl + mv.poster_path;
      });
      const item = this.genres.find(x => x.id === genre);
      item.movies = movies;
      console.log(item.movies);
    });
  }
}
