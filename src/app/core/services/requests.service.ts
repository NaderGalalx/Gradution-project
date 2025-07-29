import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  // dependancy Injection --------------------------> HttpClient
  constructor(private _HttpClient: HttpClient) { }

  // Properties ------------------------->
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }

  // Methods ---------------------------->
  getRequests(statue:any): Observable<any> {
    return this._HttpClient.get(`https://mobcity.net/laravel_api/public/api/admin/student-requests/${statue}`    , { headers: this.adminToken })
  }
  getRequest(id:any): Observable<any> {
    return this._HttpClient.get(`https://mobcity.net/laravel_api/public/api/admin/student-requests/pending/${id}`, { headers: this.adminToken })
  }
  rejectRequest(id:any , form:any):Observable<any>{
    return this._HttpClient.patch(`https://mobcity.net/laravel_api/public/api/admin/student-requests/${id}/reject`,form ,{ headers: this.adminToken })
  }
  acceptRequest(id:any , form:any):Observable<any>{
    return this._HttpClient.patch(`https://mobcity.net/laravel_api/public/api/admin/student-requests/${id}/accept`,form ,{ headers: this.adminToken })
  }

}
