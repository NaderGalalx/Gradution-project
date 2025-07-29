import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableRequestsService {

  // Dependancy Injection --------------------------->
  constructor(private _HttpClient: HttpClient) { }

  // properties-------------------------------------->
  
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }

  // methods
  getAvailableRequests(): Observable<any> {
    return this._HttpClient.get("https://mobcity.net/laravel_api/public/api/admin/request-types", { headers: this.adminToken })
  }
  deleteRequest(index: any): Observable<any> {
    return this._HttpClient.delete(`https://mobcity.net/laravel_api/public/api/admin/request-types/${index}`, { headers: this.adminToken })
  }
  addRequest(formData: any): Observable<any> {
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/admin/request-types", formData, { headers: this.adminToken })
  }
  updateRequest(formData: any, index: any): Observable<any> {
    return this._HttpClient.put(`https://mobcity.net/laravel_api/public/api/admin/request-types/${index}`, formData, { headers: this.adminToken })
  }
  getRequest(index: any): Observable<any> {
    return this._HttpClient.get(`https://mobcity.net/laravel_api/public/api/admin/request-types/${index}`, { headers: this.adminToken })
  }


}
