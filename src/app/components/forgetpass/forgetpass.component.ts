import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ResetPassService } from '../../core/services/reset-pass.service';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {
  // DI
  private readonly _Router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ResetPassService = inject(ResetPassService)
  // properties ------------------------>
  loader:boolean = false

  // form ([formBuilder])
  forgetForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })

  // Methods-------------->
  goToVerifyPage(event: Event) {
    if (this.forgetForm.valid) {
      this.loader = true
      this._ResetPassService.sendCode(this.forgetForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this._Router.navigate(['/auth/verifypass' , this.forgetForm.value.email]);
        },
        error:(err)=>{
          this.loader = false
        }
      })
    }else{
      this.forgetForm.markAllAsTouched()
    }

  }


}
