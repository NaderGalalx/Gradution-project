import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadeService {
  // dependancy Injection --------------------------> HttpClient
  constructor(private _HttpClient: HttpClient) { }

  // Properties ------------------------->
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }

  // methods ---------------------------->
  uploadSheet(formData:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/admin/import-users", formData , {headers:this.adminToken} )
  }
  createSingleUser(form:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/admin/create-user" , form ,{headers:this.adminToken} )
  }
  createAdmin(form:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/admin/create-admin", form ,{headers:this.adminToken} )
  }
}
