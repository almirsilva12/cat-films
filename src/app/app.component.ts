import { NavbarService } from './components/navbar/navbar.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cat-films';
  highContrastSubscription: Subscription;
  highContrast: string;

  constructor(private navbarService: NavbarService) {
    this.highContrastSubscription = this.navbarService.getContrastMode().subscribe(mode => {
      if (mode) {
        document.body.classList.add('contrast');
      } else {
        document.body.classList.remove('contrast');
      }
    });
  }
}
