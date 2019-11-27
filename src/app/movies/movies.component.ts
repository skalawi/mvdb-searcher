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
  posterUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/';
  mockImgUrl: string = '/assets/noimage.png';
  currentPage: number;
  totalPages: number;
  next: boolean;
  prev: boolean;

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
      this.router.navigate([`movies/${query}/${++this.currentPage}`])
    }
  }

  getPrevPage(): void{
    const query = this.route.snapshot.paramMap.get('query');
    if(this.currentPage !== 1){
      this.router.navigate([`movies/${query}/${--this.currentPage}`])
    }
  }

  getMovies(): void{
    const query = this.route.snapshot.paramMap.get('query');
    const page = +this.route.snapshot.paramMap.get('page');
    this.apiService.getMovies(query,page)
      .subscribe(result => {
        this.movies = result.movies;
        this.totalPages = result.totalPages;
        this.currentPage = page;
        if(this.currentPage === this.totalPages) {
          this.next = false;}
        else {this.next = true;}
        if(this.currentPage > 1) this.prev = true;
        else this.prev = false;
      });
  }

  validateImg(image: string): string{
    if(image == null) return this.mockImgUrl;
    else return this.posterUrl+image;
  }

}
