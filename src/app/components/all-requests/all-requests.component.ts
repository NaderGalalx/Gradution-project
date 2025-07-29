import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RequestsService } from '../../core/services/requests.service';
import { IRequests } from '../../core/interfaces/irequests';

@Component({
  selector: 'app-all-requests',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './all-requests.component.html',
  styleUrl: './all-requests.component.css'
})
export class AllRequestsComponent implements OnInit {
  private readonly _Router = inject(Router)
  private readonly _RequestsService = inject(RequestsService)

  // properties
  pendingRequests:IRequests[] = []

  // Methods
  ngOnInit(): void {
    this._RequestsService.getRequests("pending").subscribe({
      next:(res)=>{
        this.pendingRequests = res.requests
      }
    })
  }


}
