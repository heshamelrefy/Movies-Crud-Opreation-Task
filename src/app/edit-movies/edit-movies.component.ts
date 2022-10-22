import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from './../services/movies.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit-movies',
  templateUrl: './edit-movies.component.html',
  styleUrls: ['./edit-movies.component.scss']
  
})
export class EditMoviesComponent implements OnInit {
  formData:any
  movieID:any
  imgPath:any 
  imgUrl:string = ''
  constructor(private fb:FormBuilder , private router:Router,private _MoviesServies:MoviesService,private activatedRoute:ActivatedRoute) { 
    
    this.formData= new FormData();
  }
  // reactive form for edit
  editMovieForm = this.fb.group({
    name : ['',[Validators.required]],
    description:['',[Validators.required]],
    image : ['',[Validators.required]],
    category_id : ['',[Validators.required]],
 
  })

  // get form values
  get name(){
    return this.editMovieForm.get('name')
  }
  get description(){
    return this.editMovieForm.get('description')
  }
  get image(){
    return this.editMovieForm.get('image')
  }
  get category_id(){
    return this.editMovieForm.get('category_id')
  }

  // get image path
  selectedImg($event:any){
    this.imgPath = $event.target.files[0]
    
  }

  // get all categories of movies
  allCategories:any=[]
  getCategories()
  {
    this._MoviesServies.getAllCategories().subscribe((data)=>{
      console.log(data);
      this.allCategories=[...data.message]
      console.log(this.allCategories);
      
    })
  }
 // set value in edit form
  setValue()
  {
    
    for (let index = 0; index < this._MoviesServies.movies.length; index++) {
      if (this._MoviesServies.movies[index].id==this.movieID) {
        this.editMovieForm.get('name')?.setValue(this._MoviesServies.movies[index].name)
        this.editMovieForm.get('description')?.setValue(this._MoviesServies.movies[index].description)
        this.editMovieForm.get('category_id')?.setValue(this._MoviesServies.movies[index].category_id)
        this.editMovieForm.get('image')?.setValue(this._MoviesServies.movies[index].image.toString())
      }
    }
  }
  //  send data to editMovies from services

  editMovies(){
    // send data by form data
    this.formData.append('name',this.editMovieForm.get('name')?.value);
    this.formData.append('description', this.editMovieForm.get('description')?.value);
    this.formData.append('category_id', this.editMovieForm.get('category_id')?.value);
    this.formData.append('image', ''+this.editMovieForm.get('image')?.value || this.imgPath);
    this._MoviesServies.editMovie(this.movieID,this.formData).subscribe((res)=>{
      this.formData.delete('name')
      this.formData.delete('description')
      this.formData.delete('category_id')
      this.formData.delete('image')
      this._MoviesServies.getAllMovies().subscribe((data)=>{
        this._MoviesServies.movies=data.message
       })
        this.router.navigate(['/home'])
    
    })
  }

  ngOnInit(): void {
    // get all Categories
    this.getCategories()
    // get id from activatedRoute by params
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>
    {
      this.movieID=params.get('id');
     console.log(this.movieID);
     this.setValue()
     
    })
  }

}
