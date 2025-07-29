import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subnav',
  standalone: true,
  imports: [],
  templateUrl: './subnav.component.html',
  styleUrl: './subnav.component.css'
})
export class SubnavComponent {
  // DI------------------------------>
  private readonly _Router=inject(Router)

  // Methods------------------------->
  logOut(){
    sessionStorage.removeItem('token');
    this._Router.navigate(["/auth"])

  }

}
