import { Component } from '@angular/core';
import { AllEventsComponent } from '../all-events/all-events.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [AllEventsComponent, CreateEventComponent, RouterModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

}
