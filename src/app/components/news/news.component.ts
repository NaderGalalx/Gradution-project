import { Component } from '@angular/core';
import { AllnewsComponent } from '../allnews/allnews.component';
import { CreatNewComponent } from '../creat-new/creat-new.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [AllnewsComponent, CreatNewComponent, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

}
