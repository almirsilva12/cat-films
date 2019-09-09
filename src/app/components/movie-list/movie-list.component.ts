import { NavbarService } from './../navbar/navbar.service';
import { MovieDetailsService } from './../movie-details/movie-details.service';
import { Filme } from './../../classes/filme';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { Genero } from 'src/app/classes/genero';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

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
  fontSize;
  fontSizeSubscription: Subscription;
  titleSize;
  titleSizeSubscription: Subscription;

  constructor(private datePipe: DatePipe,
    public movieListService: MovieListService, public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {
    this.loadGenres();
    this.fontSizeSubscription = this.navbarService.getFontSize().subscribe(size => this.fontSize = size);
    this.titleSizeSubscription = this.navbarService.getTitleSize().subscribe(size => this.titleSize = size);
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
    const stringDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    return this.movieListService.getMoviesByGenre('pt-BR', page, genre, stringDate).subscribe((data) => {
      movies = data.results;
      movies.forEach(mv => {
        if (mv.poster_path === null) {
          mv.poster_path = this.nullImgUrl;
        } else {
          mv.poster_path = this.imgUrl + mv.poster_path;
        }

        mv.genre_ids.forEach(gr => {
          gr = this.genres.find(el => el.id === gr);
        });
      });
      const item = this.genres.find(el => el.id === genre);
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.fontSizeSubscription.unsubscribe();
    this.titleSizeSubscription.unsubscribe();
  }
}
