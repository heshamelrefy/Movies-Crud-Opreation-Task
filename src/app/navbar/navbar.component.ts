import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService,private _Router:Router) { }
  // user not Authorization
  logOut()
  {
   localStorage.clear();
   this._Router.navigate(["/login"]);
  }
  ngOnInit(): void {
  }

}
