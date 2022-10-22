import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { EditMoviesComponent } from './edit-movies/edit-movies.component';
import { SearchCategoryPipe } from './search-category.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    NavbarComponent,
    CreateMovieComponent,
    EditMoviesComponent,
    SearchCategoryPipe
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    CreateMovieComponent,
  ],
  // provide interceptor for root 
  providers: [{provide:HTTP_INTERCEPTORS,useClass:HeadersInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
