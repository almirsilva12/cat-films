import { MovieDetailsComponent } from './movie-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsService } from './movie-details.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MovieDetailsComponent
  ],
  providers: [
    MovieDetailsService
  ]
})
export class MovieDetailsModule {
}
