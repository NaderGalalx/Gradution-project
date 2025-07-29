import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  // Dependancy Injection --------------------------->
  constructor(private _HttpClient: HttpClient) { }

  // properties-------------------------------------->
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }

  // methods ---------------------------------------->
  dashboard(): Observable<any> {
    return this._HttpClient.get("https://mobcity.net/laravel_api/public/api/admin/dashboard ", { headers: this.adminToken })
  }

}
