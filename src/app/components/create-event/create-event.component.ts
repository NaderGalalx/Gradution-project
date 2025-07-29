import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsService } from '../../core/services/events.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  private readonly _EventsService = inject(EventsService)

  // properties ------------------->
  selectedImage!: File;
  loaderflag: boolean  = false
  errMessage: boolean  = false



  // form ([formBuilder])
  eventForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    desc: [null, [Validators.required]],
    date: [null, [Validators.required]],
  })


  // Methods

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

      this._EventsService.creatEvent(formData).subscribe({
        next: (res) => {
          this.loaderflag = false
          this._Router.navigate(['/main/events'])
        },
        error: (err) => {
          this.loaderflag = false
          this.errMessage = true
        }
      })

      // formData.forEach((value, key) => {
      //   console.log(key + ':', value);
      // });
    }

  }


}
