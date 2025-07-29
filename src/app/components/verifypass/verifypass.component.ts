import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResetPassService } from '../../core/services/reset-pass.service';

@Component({
  selector: 'app-verifypass',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './verifypass.component.html',
  styleUrl: './verifypass.component.css'
})
export class VerifypassComponent implements OnInit {
  // DI
  private readonly _Router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ResetPassService = inject(ResetPassService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  errMessage!:string|null
  email!: string | null
  codeDigits: string[] = ['', '', '', ''];


  // form ([formBuilder])
  forgetForm: FormGroup = this._FormBuilder.group({
    email: [this.email, [Validators.required, Validators.email]],
    code: [null, [Validators.required]],
  })

  // Methods--------------------->
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.email = res.get('email')
        this.forgetForm.patchValue({
          email: this.email
        })
      }
    })
  }


  onDigitInput(event: any, index: number) {
    const value = event.target.value;

    if (/^\d$/.test(value)) {
      this.codeDigits[index] = value;

      // انتقل للـ input اللي بعده تلقائيًا
      const next = event.target.nextElementSibling;
      if (next) {
        next.focus();
      }

      // حدّث قيمة code في الفورم
      const fullCode = this.codeDigits.join('');
      this.forgetForm.controls['code'].setValue(fullCode);
    } else {
      // لو مش رقم امسحه
      this.codeDigits[index] = '';
      event.target.value = '';
      this.forgetForm.controls['code'].setValue(this.codeDigits.join(''));
    }
  }

  submitCode() {
    const fullCode = this.codeDigits.join('');
    this.forgetForm.patchValue({
      code: fullCode
    })

    this._ResetPassService.verifyCode(this.forgetForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(['/auth/confirmpass' , this.email , fullCode])
      },
      error: (err) => {
        this.errMessage = err.error.message
      }
    })
  }





}
