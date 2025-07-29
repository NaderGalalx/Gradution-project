import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // dependancy Injection ---------> HttpClient
  constructor(private _HttpClient: HttpClient) { }
  // Properties ------------>
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }

  // methods --------------->
  getProfile():Observable<any>{
    return this._HttpClient.get("https://mobcity.net/laravel_api/public/api/profile" , {headers:this.adminToken})
  }
  deleteProfilePhoto():Observable<any>{
    return this._HttpClient.delete("https://mobcity.net/laravel_api/public/api/profile/photo" , {headers:this.adminToken})
  }
  uploadProfilephoto(formData:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/profile/photo" , formData ,{headers:this.adminToken} )
  }
}
