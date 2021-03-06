import { NavbarService } from './../navbar/navbar.service';
import { MovieDetailsService } from './movie-details.service';
import { Component, OnInit, Input } from '@angular/core';
import { Filme } from 'src/app/classes/filme';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Filme;
  movieSubscription: Subscription;
  fontSize: number;
  fontSizeSubscription: Subscription;
  titleSize: number;
  titleSizeSubscription: Subscription;

  constructor(private movieDetailsService: MovieDetailsService, public navbarService: NavbarService) {
    this.movieSubscription = this.movieDetailsService.getMovie().subscribe(mv => this.movie = mv);
    this.fontSizeSubscription = this.navbarService.getFontSize().subscribe(mv => this.fontSize = mv);
    this.titleSizeSubscription = this.navbarService.getTitleSize().subscribe(mv => this.titleSize = mv);
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
    this.fontSizeSubscription.unsubscribe();
    this.titleSizeSubscription.unsubscribe();
  }
}
