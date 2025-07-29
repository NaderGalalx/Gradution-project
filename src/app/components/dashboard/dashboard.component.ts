import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { IEventsDashboard } from '../../core/interfaces/ievents-dashboard';
import { Istatus } from '../../core/interfaces/istatus';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private _DashboardService:DashboardService) {  }

  // properties ------------>
  eventsData : IEventsDashboard[] = []
  statsData! : Istatus

  ngOnInit(): void {
    this._DashboardService.dashboard().subscribe({
      next:(res)=>{        
        this.eventsData = res.data.events
        this.statsData  = res.data.stats
      }
    })
  }

}
