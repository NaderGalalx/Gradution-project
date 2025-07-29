import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  // Dependancy Injection --------------------------->
  constructor(private _HttpClient: HttpClient) { }

  // properties-------------------------------------->
  adminToken: any = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }


  // methods ---------------------------------------->
  getEvents(): Observable<any> {
    return this._HttpClient.get("https://mobcity.net/laravel_api/public/api/events", { headers: this.adminToken })
  }
  deleteEvent(index: any): Observable<any> {
    return this._HttpClient.delete(`https://mobcity.net/laravel_api/public/api/events/${index}`, { headers: this.adminToken })
  }
  creatEvent(eventData: any): Observable<any> {
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/events", eventData , { headers: this.adminToken })
  }
  getEvent(id:any):Observable<any>{
    return this._HttpClient.get(`https://mobcity.net/laravel_api/public/api/events/${id}` , { headers: this.adminToken } )
  }
  updateEvent(id:any , formData:any):Observable<any>{
    return this._HttpClient.post(`https://mobcity.net/laravel_api/public/api/events/${id}` ,formData ,  { headers: this.adminToken } )
  }
}
