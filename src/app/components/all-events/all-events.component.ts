import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../core/services/events.service';
import { IEvents } from '../../core/interfaces/ievents';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-events',
  standalone: true,
  imports: [RouterLink , DatePipe],
  templateUrl: './all-events.component.html',
  styleUrl: './all-events.component.css'
})
export class AllEventsComponent implements OnInit {
  // DI------------------------------->
  private readonly _EventsService=inject(EventsService)

  // properties --------------------->
  eventData:IEvents[] = []


  // methods ------------------------->
  ngOnInit(): void {
    this._EventsService.getEvents().subscribe({
      next:(res)=>{
        this.eventData = res
      }
    })
  }

  deleteEvent(eventID:any){
    this._EventsService.deleteEvent(eventID).subscribe({
      next:(res)=>{
        this.eventData = res.events
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
