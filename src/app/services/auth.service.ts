import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl='https://test-api.storexweb.com/';
  loggedInInfo=new BehaviorSubject<any>(null)
  constructor(private _HttpClient:HttpClient) {
    this.loggedInInfo.next(JSON.parse(localStorage.getItem('userInfo')||'{}')?JSON.parse(localStorage.getItem('userInfo')||'{}'):{});
   }
  signUp(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'api/register',data)
  }

  signIn(data:any):Observable<any>
  {
    return this._HttpClient.post(this.baseUrl+'api/login',data)
  }
 
  isLoggedIn()
  {
    return !!localStorage.getItem("TOKEN")
  }
}
