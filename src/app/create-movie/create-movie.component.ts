import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from './../services/movies.service';
@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {
  @Input() display:boolean = false
  formData:any
  
  constructor(private fb:FormBuilder , private router:Router,private _MoviesServies:MoviesService) { 
    this.formData= new FormData();
  }
  // reactive form add Movie
  addMovieForm = this.fb.group({
    name : ['',[Validators.required]],
    description:['',[Validators.required]],
    image : ['',[Validators.required]],
    category_id : ['',[Validators.required]],
 
  })

  imgPath:any
  


  // get form values
  get name(){
    return this.addMovieForm.get('name')
  }
  get description(){
    return this.addMovieForm.get('description')
  }
  get image(){
    return this.addMovieForm.get('image')
  }
  get category_id(){
    return this.addMovieForm.get('category_id')
  }
  
  // get image path
  imgPerfix:string='https://test-api.storexweb.com'
  selectedImg($event:any){
    this.imgPath = $event.target.files[0]
  }
  // Create movie and call back end and show response from back end && create Movie
  addMovies()

  {
    
    this.formData.append('image', this.imgPath);
    this.formData.append('name',this.addMovieForm.get('name')?.value);
    this.formData.append('description', this.addMovieForm.get('description')?.value);
    this.formData.append('category_id', this.addMovieForm.get('category_id')?.value);
  // 
    this._MoviesServies.addMovie(this.formData).subscribe((data)=>{
     if (data.status == 'success') {
      this.formData.delete('name')
      this.formData.delete('description')
      this.formData.delete('category_id')
      this.formData.delete('image')
     this._MoviesServies.getAllMovies().subscribe((data)=>{
      this._MoviesServies.movies=data.message
      this.router.navigate(["/home"])
     })
     }
    })
  }
allCategories:any=[]
// get all Categories
  getCategories()
  {
    this._MoviesServies.getAllCategories().subscribe((data)=>{
      this.allCategories=[...data.message]
    })
  }
  ngOnInit(): void {
    this.getCategories()
  }


}
