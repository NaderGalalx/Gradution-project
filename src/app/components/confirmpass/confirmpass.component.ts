import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPassService } from '../../core/services/reset-pass.service';

@Component({
  selector: 'app-confirmpass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmpass.component.html',
  styleUrl: './confirmpass.component.css'
})
export class ConfirmpassComponent implements OnInit {

  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ResetPassService = inject(ResetPassService)
  private readonly _Router = inject(Router)

  // ----------------->
  email!: string | null
  code!: string | null
  errMessage: boolean = false

  // form ([formBuilder])
  resetPasswordForm: FormGroup = this._FormBuilder.group({
    newPassword: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],  // accept any language / any letter
    rePassword: [null, [Validators.required]],
    email: [null, [Validators.required]],
    code: [null, [Validators.required]]
  }, this.confirmPassword)

  // custome validator for repassword match
  confirmPassword(g: AbstractControl) {
    if (g.get("newPassword")?.value === g.get("rePassword")?.value) {
      return null;
    } else {
      return { misMatch: true }
    }
  }


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.email = params.get('email');
      this.code = params.get('code');
    });
  }
  // Methods
  showPassFlag: Boolean = false
  showPass() {
    this.showPassFlag = !this.showPassFlag
  }
  ResetPassword() {
    this.errMessage = false
    this._ResetPassService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this._Router.navigate(["/auth/login"])
      },
      error: (err) => {
        this.errMessage = true
      }
    })
  }

}
