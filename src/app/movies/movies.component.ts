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
  currentPage: number;
  totalPages: number;

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

  getNextPage(): void{
    const query = this.route.snapshot.paramMap.get('query');
    if(this.currentPage < this.totalPages){
      this.apiService.getPage(query, ++this.currentPage)
        .subscribe(result => this.movies = result.movies);
    }
  }

  getPrevPage(): void{
    const query = this.route.snapshot.paramMap.get('query');
    if(this.currentPage !== 1){
      this.apiService.getPage(query, --this.currentPage)
        .subscribe(result => this.movies = result.movies);
    }
  }

  getMovies(): void{
    const query = this.route.snapshot.paramMap.get('query');
    this.apiService.getMovies(query)
      .subscribe(result => {
        this.movies = result.movies;
        this.totalPages = result.totalPages;
        this.currentPage = 1;
        console.log(this.totalPages);
      });
  }

}
