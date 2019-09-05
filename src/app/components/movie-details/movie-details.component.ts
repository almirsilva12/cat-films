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

  constructor(private movieDetailsService: MovieDetailsService) {
    this.movieSubscription = this.movieDetailsService.getMovie().subscribe(mv => this.movie = mv);
  }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    this.movieSubscription.unsubscribe();
  }
}
