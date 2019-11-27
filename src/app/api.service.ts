import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIES } from './mock-movies';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private searchUrl = 'https://api.themoviedb.org/3/search/movie';
  private movieUrl = 'https://api.themoviedb.org/3/movie/'
  private API_KEY = '67db7ad6fd8076f2f34a33a942cce915';
  constructor(private http: HttpClient) { }

  getMovies(query: String): Observable<any> {
    return this.http.get(this.searchUrl+`?api_key=${this.API_KEY}&query=${query}`).pipe(
      map(result => result['results'])
    );
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(this.movieUrl+`${id}?api_key=${this.API_KEY}`);
  }
}
