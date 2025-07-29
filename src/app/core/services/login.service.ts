import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // dependancy Injection ---------> HttpClient
  constructor(private _HttpClient: HttpClient) { }

  headers = { 'Accept': 'application/json'}

  Login(userData:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/login" , userData )
  }

}
