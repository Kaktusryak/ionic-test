import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'organization-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private movieService = inject(MovieService);

  private currentPage = 1;
  movies: any[] = [];
  imageBaseURL = 'https://image.tmdb.org/t/p';
  isLoading = true;
  error = null;
  public dummyArray = new Array(5);

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
      }),
      catchError((err: any) => {
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res)=>{
        this.movies.push(...res.results)
        event?.target.complete()

        if(event){
          event.target.disabled = res.total_pages === this.currentPage
        }
      }
    });
  }

  loadMore(event:InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event)
  }
}
