import { Component, OnInit, Input } from '@angular/core';
import { Filme } from 'src/app/classes/filme';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  constructor() { }

  @Input() movie: Filme;

  ngOnInit() {
    console.log(this.movie);
  }
}
