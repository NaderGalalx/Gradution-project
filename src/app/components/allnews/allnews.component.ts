import { NewsService } from './../../core/services/news.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { INews } from '../../core/interfaces/inews';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allnews',
  standalone: true,
  imports: [RouterLink , DatePipe],
  templateUrl: './allnews.component.html',
  styleUrl: './allnews.component.css'
})
export class AllnewsComponent implements OnInit {
  // DI----------------->
  constructor(private _NewsService: NewsService) { }
  private readonly _Router = inject(Router)


  // Properties ---------------->
  NewsData: INews[] = [];

  // Methods ----------------------->

  ngOnInit(): void {
    this._NewsService.getNews().subscribe({
      next: (res) => {
        this.NewsData = res
      },
    })
  }

  deleteNew(newId: any) {
    this._NewsService.deleteNew(newId).subscribe({
      next: (res) => {
        this.NewsData = res.news
      },
      error: (err) => { console.log(err) }
    })
  }

}
