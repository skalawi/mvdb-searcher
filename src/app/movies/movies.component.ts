import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { ApiService } from '../api.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private router: Router) {
      router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.getMovies();
      })
    }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void{
    console.log("lol");
    const query = this.route.snapshot.paramMap.get('query');
    this.apiService.getMovies(query)
      .subscribe(movies => this.movies = movies);
  }

}
