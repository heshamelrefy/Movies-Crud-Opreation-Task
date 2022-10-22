import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://test-api.storexweb.com/';
  token: any;
  movies: any = [];
  constructor(private _HttpClient: HttpClient) {
    this.token = localStorage.getItem('TOKEN');
    this.getAllMovies().subscribe((data: any) => {
      console.log(data);
      this.movies = data.message;
      console.log(this.movies);
    });
  }
  
  // get all movies
  getAllMovies(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'api/movies');
  }
  // get all categories
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + 'api/category');
  }
  // create Movies
  addMovie(data: any): Observable<any> {
    let headers = new HttpHeaders({
      
      'Accept': '*/*'
    });

    return this._HttpClient.post(this.baseUrl + 'api/movies', data, {
      headers: headers,
    });
  }
  // Edit movie
  editMovie(id: number, data: any): Observable<any> {
    let headers = new HttpHeaders({
      
      'Accept': '*/*'
    });
    return this._HttpClient.put(this.baseUrl + 'api/movies/' + id, data, {
      headers: headers,
    });
  }
  // delete movie
  deleteMovie(id: any): Observable<any> {
    let headers = new HttpHeaders({
      
      'Accept': '*/*'
    });
    return this._HttpClient.delete(this.baseUrl + 'api/movies/' + id, {
      headers: headers,
    });
  }
}
