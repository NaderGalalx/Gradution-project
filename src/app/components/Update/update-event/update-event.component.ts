import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../core/services/events.service';
import { IEvents } from '../../../core/interfaces/ievents';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css'
})
export class UpdateEventComponent implements OnInit {
  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  private readonly _EventsService = inject(EventsService)

  // properties ------------------->
  selectedImage!: File;
  loaderflag: boolean = false
  errMessage: boolean = false
  eventIndex!: string | null
  eventData!: IEvents




  // form ([formBuilder])
  eventForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    desc: [null, [Validators.required]],
    date: [null, [Validators.required]],
  })


  // Methods
  ngOnInit(): void {
    // get ID from the URL ------------------------------>

    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => { this.eventIndex = res.get("event_id") }
    });

    // get API ------------------------------------>

    this._EventsService.getEvent(this.eventIndex).subscribe({
      next: (res) => {
        this.eventData = res;

        const formattedDate = this.eventData.start_time.split('T')[0]; 

        this.eventForm.patchValue({
          name: this.eventData.title,
          desc: this.eventData.description,
          date: formattedDate
        });
      },
      error: (err) => {
        this.errMessage = true;
      }
    });


  }

  cancelEvent() {
    this._Router.navigate(["/main/events"])
  }
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched()
    }
    else {

      this.loaderflag = true

      const formData = new FormData();
      formData.append('title', this.eventForm.value.name);
      formData.append('description', this.eventForm.value.desc);
      formData.append('start_time', this.eventForm.value.date);
      formData.append('image', this.selectedImage);

      this._EventsService.updateEvent(this.eventIndex , formData).subscribe({
        next:(res)=>{
          this.loaderflag = false
          this._Router.navigate(['/main/events'])
        },
        error:(err)=>{this.errMessage = true
        }
      })

    }

  }

}
