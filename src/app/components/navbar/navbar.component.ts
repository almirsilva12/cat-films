import { MovieDetailsService } from './../movie-details/movie-details.service';
import { Filme } from 'src/app/classes/filme';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {
    this.loadGenres();
  }

  nullImgUrl = 'assets/img/no-poster.jpg';
  imgUrl = 'https://image.tmdb.org/t/p/w780';
  genres;
  search;
  searchedMovies: Filme[];
  resultSearch = false;
  movieDetailed: Filme;
  fontSize = 15;
  fontSizeSubscription: Subscription;

  ngOnInit() {
  }

  closeSearch() {
    this.resultSearch = !this.resultSearch;
    this.search = '';
  }

  detailMovie(movie) {
    this.movieDetailsService.sendMovie(movie);
  }

  changeFontSize(op) {
    op === '+' ? this.fontSize++ : this.fontSize--;
    this.navbarService.sendFontSize(this.fontSize);
  }

  loadGenres() {
    return this.navbarService.getGenres('pt-BR').subscribe((data) => {
      this.genres = data.genres;
    });
  }

  searchMovie() {
    return this.navbarService.getMoviesBySearch(this.search, 'pt-BR', 1).subscribe((data) => {
      console.log(data);
      const movies = data.results;
      movies.forEach(mv => {
        if (mv.poster_path === null) {
          mv.poster_path = this.nullImgUrl;
        } else {
          mv.poster_path = this.imgUrl + mv.poster_path;
        }
      });
      this.searchedMovies = movies;
      this.resultSearch = true;
    });
  }

}
