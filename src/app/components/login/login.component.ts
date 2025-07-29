import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // DI ----------------->
  private readonly _FormBuilder  = inject(FormBuilder)
  private readonly _Router       = inject(Router)
  private readonly _LoginService = inject(LoginService)



  // Properties----------->
  loader:boolean = false

  errorMessage!:string;
  showPassFlag: Boolean = false

  // form ([formBuilder])
  loginForm: FormGroup = this._FormBuilder.group({
    email:    ['abdo@gmail.com', [Validators.required, Validators.email]],
    password: [123456, [Validators.required]]  // accept any language / any letter
  })

  // Methods
  login() {
    if( this.loginForm.valid ){
      this.loader = true
      this._LoginService.Login(this.loginForm.value).subscribe({
        next:(res)=>{
          sessionStorage.setItem("token",res.token)
          this._Router.navigate(['/main'])
          },
        error:(err)=>{
          this.loader = false
          this.errorMessage = "Invalid email or password"
        }
      })

    }else{
      this.loginForm.markAllAsTouched()
    }

  }
  showPass() {
    this.showPassFlag = !this.showPassFlag
  }

}
