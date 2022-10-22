import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isClicked:boolean=true;
  responseMassage=""
  isReport=""
  isSuccess:boolean=false
  isBug:boolean=false
  token:any
  constructor(private _AuthService:AuthService) { }
  // reactive form for sign up
  signUp=new FormGroup ({
    "name":new FormControl('',[Validators.required,Validators.pattern(/^[[a-z]{3,8}$/)]),
    "email":new FormControl('',[Validators.required,Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    "password":new FormControl('',[Validators.required,Validators.minLength(6)]),
  })
// send data to back and and check response if user already register or not
  FormData()
  {
    this.isClicked=false
    if (this.signUp.valid) {
      this._AuthService.signUp(this.signUp.value).subscribe((data)=>{
        console.log(data);
        
    if (data.status=="success") {
      console.log(data);
      this.token=data.authorisation.token
      this.isClicked=true
      this.isSuccess=true
      this.isBug=false
      this.responseMassage=data.message;
      this.signUp.reset();
      console.log('token is > ',this.token);
      
    }
    else{
      console.log(data)
      this.isReport=data.message.email
      this.isClicked=true;
        this.isSuccess=false
        this.isBug=true
    }
      })
    }
  
    
  }
  ngOnInit(): void {
  }

}
