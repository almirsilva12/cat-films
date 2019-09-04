import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { Genero } from 'src/app/classes/genero';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  constructor(public movieListService: MovieListService) {
    this.loadGenres();
  }
  nullImgUrl = 'assets/img/no-poster.jpg';
  imgUrl = 'https://image.tmdb.org/t/p/w780';
  genres: Genero[];

  ngOnInit() {
  }

  loadGenres() {
    return this.movieListService.getGenres('pt-BR').subscribe((data: any) => {
      this.genres = data.genres;
      this.genres.forEach(element => {
        this.loadMoviesByGenre(element.id);
      });
    });
  }

  loadMoviesByGenre(genre) {
    return this.movieListService.getMoviesByGenre('pt-BR', 1, genre).subscribe((data) => {
      const movies = data.results;
      console.log(movies);
      movies.forEach(mv => {
        if (mv.poster_path === null) {
          mv.poster_path = this.nullImgUrl;
        } else {
          mv.poster_path = this.imgUrl + mv.poster_path;
        }
      });
      const item = this.genres.find(x => x.id === genre);
      item.movies = movies;
      console.log(item.movies);
    });
  }
}
