import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Genero } from './classes/genero';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cat-films';
  genres = {}
  constructor(public appService: AppService) {
    this.loadGenres();
  }

  loadGenres() {
    return this.appService.getGenres().subscribe((data: Genero[]) => {
      this.genres = data.genres;
      console.log(data);
    })
  }
}
