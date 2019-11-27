import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void{
    this.apiService.getMovies('once')
      .subscribe(movies => this.movies = movies);
  }

}
