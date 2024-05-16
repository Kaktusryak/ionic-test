import { Component, OnInit } from '@angular/core';
import { Input, WritableSignal, inject, signal } from '@angular/core';

import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'organization-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {
  private movieService = inject(MovieService);

  public movie: WritableSignal<MovieResult | null> = signal<MovieResult | null>(
    null
  );
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  @Input() set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log(movie)
      this.movie.set(movie);
    });
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }

}
