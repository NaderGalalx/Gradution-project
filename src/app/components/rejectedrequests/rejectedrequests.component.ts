import { Component, inject, OnInit } from '@angular/core';
import { IRequests } from '../../core/interfaces/irequests';
import { RequestsService } from '../../core/services/requests.service';

@Component({
  selector: 'app-rejectedrequests',
  standalone: true,
  imports: [],
  templateUrl: './rejectedrequests.component.html',
  styleUrl: './rejectedrequests.component.css'
})
export class RejectedrequestsComponent implements OnInit {
  private readonly _RequestsService = inject(RequestsService)

  // properties
  rejectedRequests:IRequests[] = []

  // Methods
  ngOnInit(): void {
    this._RequestsService.getRequests("rejected").subscribe({
      next:(res)=>{
        this.rejectedRequests = res.requests
      }
    })
  }
}
