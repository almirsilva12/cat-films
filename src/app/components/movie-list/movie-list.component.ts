import { NavbarService } from './../navbar/navbar.service';
import { MovieDetailsService } from './../movie-details/movie-details.service';
import { Filme } from './../../classes/filme';
import { Component, OnInit, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { MovieListService } from './movie-list.service';
import { Genero } from 'src/app/classes/genero';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SwiperScrollbarInterface, SwiperPaginationInterface, SwiperConfigInterface, SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';

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

  
  public movies = [
    'First slide',
    'Second slide',
    'Third slide',
    'Fourth slide',
    'Fifth slide',
    'Sixth slide'
  ];
  public config: SwiperConfigInterface = {};

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  constructor(private datePipe: DatePipe,
    public movieListService: MovieListService, public navbarService: NavbarService, public movieDetailsService: MovieDetailsService) {
    this.fontSizeSubscription = this.navbarService.getFontSize().subscribe(size => this.fontSize = size);
    this.titleSizeSubscription = this.navbarService.getTitleSize().subscribe(size => this.titleSize = size);
    this.loadGenres();
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      autoplay: {
        delay: 600,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
 
  }


  public onIndexChange(index: number): void {
    console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
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
    const stringDate = this.datePipe.transform(this.currentDate,"yyyy-MM-dd")
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.fontSizeSubscription.unsubscribe();
    this.titleSizeSubscription.unsubscribe();
  }
}
