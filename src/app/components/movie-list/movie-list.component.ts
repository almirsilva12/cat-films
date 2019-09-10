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
  fontSize: number;
  fontSizeSubscription: Subscription;
  titleSize: number;
  titleSizeSubscription: Subscription;
  @ViewChildren('widgetsContent') public widgetsContent: ElementRef<any>;

  constructor(private datePipe: DatePipe, public movieListService: MovieListService,
              public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {
              this.loadGenres();
              this.fontSizeSubscription = this.navbarService.getFontSize().subscribe(size => this.fontSize = size);
              this.titleSizeSubscription = this.navbarService.getTitleSize().subscribe(size => this.titleSize = size);
  }

  ngOnInit() {
  }

  scroll(i: number, dir: string) {
    // @ts-ignore
    const elementRefs: Array<any> = this.widgetsContent.toArray();
    if (dir === 'right') {
      elementRefs[i].nativeElement.scrollTo({
        left: (elementRefs[i].nativeElement.scrollLeft + 1500), behavior: 'smooth'
      });
    } else {
      elementRefs[i].nativeElement.scrollTo({
        left: (elementRefs[i].nativeElement.scrollLeft - 1500), behavior: 'smooth'
      });
    }
  }

  onScroll(genre: Genero) {
    genre.pageNumber += 1;
    this.loadMoviesByGenre(genre.pageNumber, genre.id);
  }

  detailMovie(movie: Filme) {
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

  loadMoviesByGenre(page: number, idGenre: number) {
    let movies = [];
    const stringDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    return this.movieListService.getMoviesByGenre('pt-BR', page, idGenre, stringDate).subscribe((data) => {
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
      const item = this.genres.find(el => el.id === idGenre);
      if (page > 1) {
        movies.forEach(m => {
          item.movies.push(m);
        });
      } else {
        item.movies = movies;
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.fontSizeSubscription.unsubscribe();
    this.titleSizeSubscription.unsubscribe();
  }
}
