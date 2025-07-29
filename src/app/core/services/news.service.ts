import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // dependancy Injection ---------> HttpClient
  constructor(private _HttpClient: HttpClient) { }
  // Properties ------------>
  adminToken:any = { 'Authorization' : `Bearer ${sessionStorage.getItem('token')}`}

  // Methods ---------------------------->
  getNews():Observable<any>{
    return this._HttpClient.get("https://mobcity.net/laravel_api/public/api/news" , {headers: this.adminToken} )
  }
  getNew(id:any):Observable<any>{
    return this._HttpClient.get(`https://mobcity.net/laravel_api/public/api/news/${id}`, {headers: this.adminToken} )
  }

  updateNew( id:any , newsData:any ):Observable<any>{
    return this._HttpClient.post(`https://mobcity.net/laravel_api/public/api/news/${id}` , newsData , {headers:this.adminToken} )
  }
  
  creatNews(newsData:any):Observable<any>{
    return this._HttpClient.post("https://mobcity.net/laravel_api/public/api/news" , newsData , {headers:this.adminToken} )
  }

  deleteNew(index:any):Observable<any>{
    return this._HttpClient.delete(`https://mobcity.net/laravel_api/public/api/news/${index}` , {headers:this.adminToken})
  }
  

}
