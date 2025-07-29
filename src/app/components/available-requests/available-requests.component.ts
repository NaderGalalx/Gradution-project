import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvailableRequestsService } from '../../core/services/available-requests.service';
import { IAvailable } from '../../core/interfaces/iavailable';

@Component({
  selector: 'app-available-requests',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './available-requests.component.html',
  styleUrl: './available-requests.component.css'
})
export class AvailableRequestsComponent implements OnInit {
  private readonly _Router = inject(Router)
  private readonly _AvailableRequestsService = inject(AvailableRequestsService)

  // properties
  availableRequests:IAvailable[] = []

  // methods
  ngOnInit(): void {
    this._AvailableRequestsService.getAvailableRequests().subscribe({
      next:(res)=>{
        this.availableRequests = res.types
        
      }
    })
  }
  delete(index:any){
    this._AvailableRequestsService.deleteRequest(index).subscribe({
      next:(res)=>{
        window.location.reload()
      },
    })
  }


}
