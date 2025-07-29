import { Component, inject, OnInit } from '@angular/core';
import { IRequests } from '../../core/interfaces/irequests';
import { RequestsService } from '../../core/services/requests.service';

@Component({
  selector: 'app-acceptedrequests',
  standalone: true,
  imports: [],
  templateUrl: './acceptedrequests.component.html',
  styleUrl: './acceptedrequests.component.css'
})
export class AcceptedrequestsComponent implements OnInit {
  private readonly _RequestsService = inject(RequestsService)

  // properties
  acceptedRequests: IRequests[] = []

  // Methods
  ngOnInit(): void {
    this._RequestsService.getRequests("accepted").subscribe({
      next: (res) => {
        this.acceptedRequests = res.requests
      }
    })
  }
}
