import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public navbarService: NavbarService) {
    this.loadGenres();
  }

  genres = {};

  ngOnInit() {
  }

  loadGenres() {
    return this.navbarService.getGenres('pt-BR').subscribe((data) => {
      this.genres = data.genres;
      console.log(this.genres);
    });
  }
}
