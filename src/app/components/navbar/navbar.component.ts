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
  constructor(public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {}

  nullImgUrl = 'assets/img/no-poster.jpg';
  imgUrl = 'https://image.tmdb.org/t/p/w780';
  genres;
  search = '';
  searchedMovies: Filme[];
  resultSearch = false;
  movieDetailed: Filme;
  titleSize = 18;
  fontSize = 14;
  highContrastMode = false;
  fontSizeSubscription: Subscription;
  highContrastSubscription: Subscription;

  ngOnInit() {
    this.changeFontSize('=');
  }

  closeSearch() {
    this.resultSearch = !this.resultSearch;
    this.search = '';
  }

  detailMovie(movie) {
    this.movieDetailsService.sendMovie(movie);
  }

  changeContrastMode() {
    this.highContrastMode = !this.highContrastMode;
    if (this.highContrastMode) {
      this.navbarService.sendContrastMode(true);
    } else {
      this.navbarService.sendContrastMode(false);
    }
  }

  changeFontSize(op) {
    if (op === '+') {
      if (this.fontSize < 22) {
        this.fontSize++;
        this.titleSize++;
      }
    } else if (op === '-') {
      if (this.fontSize > 8) {
        this.fontSize--;
        this.titleSize--;
      }
    } else if (op === '=') {
      this.fontSize = 14;
      this.titleSize = 18;
    }
    this.navbarService.sendFontSize(this.fontSize);
    this.navbarService.sendTitleSize(this.titleSize);
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
