import { SubnavComponent } from './../../components/subnav/subnav.component';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavMainComponent } from "../../components/nav-main/nav-main.component";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, NavMainComponent , SubnavComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
