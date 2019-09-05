import { NavbarService } from './../navbar/navbar.service';
import { MovieDetailsService } from './../movie-details/movie-details.service';
import { Filme } from './../../classes/filme';
import { Component, OnInit } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { Genero } from 'src/app/classes/genero';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  nullImgUrl = 'assets/img/no-poster.jpg';
  imgUrl = 'https://image.tmdb.org/t/p/w780';
  genres: Genero[];
  movieDetailed: Filme;
  currentDate = new Date();
  fontSize = 15;
  fontSizeSubscription: Subscription;

  constructor(
    public movieListService: MovieListService, public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {
    this.loadGenres();
    this.fontSizeSubscription = this.navbarService.getFontSize().subscribe(mv => this.fontSize = mv);
  }

  ngOnInit() {
  }

  onScroll(genre) {
    genre.pageNumber += 1;
    this.loadMoviesByGenre(genre.pageNumber, genre.id);
  }

  detailMovie(movie) {
    this.movieDetailsService.sendMovie(movie);
  }

  loadGenres() {
    return this.movieListService.getGenres('pt-BR').subscribe((data: any) => {
      this.genres = data.genres;
      this.genres.forEach(element => {
        element.pageNumber = 1;
        this.loadMoviesByGenre(element.pageNumber, element.id);
      });
    });
  }

  loadMoviesByGenre(page, genre) {
    let movies = [];
    const stringDate = this.currentDate.getFullYear().toString() + '-' +
    this.dateFormatter(this.currentDate.getMonth().toString()) + '-' + this.dateFormatter(this.currentDate.getDay().toString());
    return this.movieListService.getMoviesByGenre('pt-BR', page, genre, stringDate).subscribe((data) => {
      movies = data.results;
      movies.forEach(mv => {
        if (mv.poster_path === null) {
          mv.poster_path = this.nullImgUrl;
        } else {
          mv.poster_path = this.imgUrl + mv.poster_path;
        }
      });
      const item = this.genres.find(x => x.id === genre);
      if (page > 1) {
        movies.forEach(m => {
          item.movies.push(m);
        });
      } else {
        item.movies = movies;
      }
    });
  }

  dateFormatter(date) {
    if (date.length === 1) {
      return '0' + date;
    } else {
      return date;
    }
  }
}
