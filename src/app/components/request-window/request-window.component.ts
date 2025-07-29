import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../../core/services/requests.service';
import { IRequests } from '../../core/interfaces/irequests';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-window',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './request-window.component.html',
  styleUrl: './request-window.component.css'
})
export class RequestWindowComponent implements OnInit {
  // DI ----------------------->
  private readonly _Router = inject(Router)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _RequestsService = inject(RequestsService)
  private readonly _FormBuilder = inject(FormBuilder)


  // Properties --------------->
  imageUrl: string = '';
  fallbackImage: string = './assets/images/default.png';
  openTabFlag1: boolean = false
  openTabFlag2: boolean = false
  errMessage:   boolean = false

  requestId!: string | null
  requestData!: IRequests
  rejectReason!: string | null
  deliverDate!: string | null

  // form ([formBuilder])
  acceptForm: FormGroup = this._FormBuilder.group({
    delivery_date: [null, [Validators.required]],
  })
  rejecttForm: FormGroup = this._FormBuilder.group({
    reason: [null, [Validators.required]],
  })


  // Methods ------------------->
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
  acceptRequest() {
    // const deliverDateForm = { "delivery_date": this.deliverDate }
    this._RequestsService.acceptRequest(this.requestId, this.acceptForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/main/stdrequests'])
      },
      error: (err) => {
        console.log(err);
        
        this.errMessage = true
      }
    })
  }

  rejectRequest() {
    console.log(this.rejecttForm);
    
    // const rejectForm = { "reason": this.rejectReason }
    this._RequestsService.rejectRequest(this.requestId, this.rejecttForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._Router.navigate(['/main/stdrequests'])
      }, error: (err) => { this.errMessage = true }
    })

  }
  ngOnInit(): void {
    // get index from URL -------------------------->
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => { this.requestId = res.get('id') }
    })

    // get API -------------------------------------->
    this._RequestsService.getRequest(this.requestId).subscribe({
      next: (res) => {
        this.requestData = res.request
        this.imageUrl = this.requestData.receipt_image
      },
    })
  }
}
