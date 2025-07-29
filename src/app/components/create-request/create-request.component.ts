import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailableRequestsService } from '../../core/services/available-requests.service';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {
  // DI ----------------->
  // constructor(private _NewsService: NewsService) { }
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)
  private readonly _AvailableRequestsService = inject(AvailableRequestsService)

  // properties ------------------->
  loaderflag: boolean = false
  errMessage: boolean = false

  // form ([formBuilder]) -------------------------->
  requestForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    price: [null, [Validators.required]],
    description: [null, [Validators.required]],
  })


  // Methods --------------------------->

  cancelNew() {
    this._Router.navigate(["/main/manage-requests"])
  }
  onSubmit() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched()
    }
    else {
      this.loaderflag = true

      this._AvailableRequestsService.addRequest(this.requestForm.value).subscribe({
        next: (res) => {
          this.loaderflag = false
          this._Router.navigate(['/main/manage-requests'])
        },
        error:(err)=>{
          this.errMessage = true
          this.loaderflag = false
        }
      })

    }


  }
  

}
