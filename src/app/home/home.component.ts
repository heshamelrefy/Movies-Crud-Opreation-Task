import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MoviesService } from './../services/movies.service';
import { EditMoviesComponent } from './../edit-movies/edit-movies.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  token: any = '';
  movies: any = [];
  formData: any;
  display: boolean = false
  imgPerfix:string='https://test-api.storexweb.com/'
  
  allCategories:any=[]
  term:any
  constructor(public _MoviesServies: MoviesService) {
    this.token = localStorage.getItem('TOKEN');
    this.formData = new FormData();
  }

clearFilter()
{
  this.term=''
  
}
  // pop up questin user for delete movie
  popupForDelete(movie: any) {
    let confirmed = confirm('are you sure ?!!');
    if (confirmed) {
      this.deleteMovie(movie);
    }
  }
  //  call method in child
  deleteMovie(id: any) {
    this._MoviesServies.deleteMovie(id).subscribe((data) => {
      this._MoviesServies.getAllMovies().subscribe((data: any) => {
        this._MoviesServies.movies = data.message;
      });
    });
  }

// get all categories
  getCategories()
  {
    this._MoviesServies.getAllCategories().subscribe((data)=>{
      console.log(data);
      this.allCategories=[...data.message]
      console.log(this.allCategories);
      
    })
  }
  ngOnInit(): void {
    this.getCategories()
  }

  
}
