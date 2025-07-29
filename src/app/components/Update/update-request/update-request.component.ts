import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailableRequestsService } from '../../../core/services/available-requests.service';
import { IAvailable } from '../../../core/interfaces/iavailable';

@Component({
  selector: 'app-update-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-request.component.html',
  styleUrl: './update-request.component.css'
})
export class UpdateRequestComponent implements OnInit {
  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  private readonly _AvailableRequestsService = inject(AvailableRequestsService)

  // properties ------------------->
  loaderflag: boolean = false
  errMessage: boolean = false
  requestId!: string | null
  requestData!: IAvailable 

  // form ([formBuilder]) -------------------------->
  requestForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    price: [null, [Validators.required]],
    description: [null, [Validators.required]],
  })


  // Methods --------------------------->
  ngOnInit(): void {
    // get id from the URL -------->
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.requestId = res.get("req_id");

        // get API 
        this._AvailableRequestsService.getRequest(this.requestId).subscribe({
          next: (res) => {
            this.requestData = res.request_type;

            this.requestForm.patchValue({
              name: this.requestData.name,
              price: this.requestData.price,
              description: this.requestData.description
            });
          },
          error: (err) => {
            this.errMessage = true;
          }
        });
      }
    });
  }

  cancelNew() {
    this._Router.navigate(["/main/manage-requests"])
  }
  update() {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched()
    }
    else {
      this.loaderflag = true
      this._AvailableRequestsService.updateRequest(this.requestForm.value , this.requestId).subscribe({
        next:(res)=>{
          this.loaderflag = false
          this._Router.navigate(['/main/manage-requests'])
        },
        error:(err)=>{
          console.log(err);
          
          this.loaderflag = false
          this.errMessage = true
        }
      })
    }

  }



}
