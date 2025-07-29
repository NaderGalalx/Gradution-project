import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AllRequestsComponent } from '../all-requests/all-requests.component';
import { RequestWindowComponent } from '../request-window/request-window.component';
import { AcceptedrequestsComponent } from '../acceptedrequests/acceptedrequests.component';
import { RejectedrequestsComponent } from '../rejectedrequests/rejectedrequests.component';

@Component({
  selector: 'app-stdrequests',
  standalone: true,
  imports: [AllRequestsComponent,
            RequestWindowComponent,
            AcceptedrequestsComponent,
            RejectedrequestsComponent,
            RouterLink,RouterLinkActive,
            RouterOutlet],
  templateUrl: './stdrequests.component.html',
  styleUrl: './stdrequests.component.css'
})
export class StdrequestsComponent {
  private readonly _Router = inject(Router)

  // Methods
  viewRequest() {
    this._Router.navigate(["/main/request"])
  }

}
