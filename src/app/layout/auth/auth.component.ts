import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavAuthComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
