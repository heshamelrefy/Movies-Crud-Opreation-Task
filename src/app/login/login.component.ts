import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) { }

  // reactive form for sign in
  token:any
  inccorectPassword=""
  logOut:boolean=false
  signIn=new FormGroup ({
    
    "email":new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    "password":new FormControl('',[Validators.required,Validators.minLength(6)]),
  })
// send data to back end and check user already register or not
  FormData()
  {
    if (this.signIn.valid) {
      
      this._AuthService.signIn(this.signIn.value).subscribe((res)=>{
        this.token=res.token
       if (res.status=="success") {
         this.logOut=true
         localStorage.setItem("TOKEN", res.authorisation.token);
         this._Router.navigate(["/home"]);

        }
        else 
        {
          this.inccorectPassword=res.message

        }
      })
    }
  }
  ngOnInit(): void {
  }

}
