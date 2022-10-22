import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMoviesComponent } from './edit-movies/edit-movies.component';
import { AuthenticatedGuard } from './Guard/authenticated.guard';
const routes: Routes = [
  {path:"" ,redirectTo:"home",pathMatch:"full"},
  {path:"home" ,canActivate:[AuthenticatedGuard],component:HomeComponent,
  children:[
    {path:"create",canActivate:[AuthenticatedGuard] ,component:CreateMovieComponent},
    {path:"edit/:id",canActivate:[AuthenticatedGuard] ,component:EditMoviesComponent},
  ]
  },
  {path:"register" ,component:RegisterComponent},
  {path:"login" ,component:LoginComponent},
  {path:"**" ,component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
