import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPassService {
  // dependancy Injection ---------> HttpClient
  constructor(private _HttpClient: HttpClient) { }

  resetPassword(email:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/password/reset"       , email)
  }
  verifyCode(form:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/password/verify-code" , form)
  }
  sendCode(form:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/password/send-code"   , form)
  }
}
