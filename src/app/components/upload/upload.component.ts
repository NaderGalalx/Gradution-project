import { CommonModule } from '@angular/common';
import { UploadeService } from './../../core/services/uploade.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  // DI ------------------------ -------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _UploadeService = inject(UploadeService)

  // properties ------------------------>
  showUserForm = true;
  showAdminForm = true;
  activeBtn: boolean = false
  activeBtn2: boolean = false

  loader:boolean = false
  errMessage: boolean = false
  usererrMessage!:string|null
  adminerrMessage!: string|null
  userDone: boolean = false
  adminDone: boolean = false

  // form ([formBuilder])
  stdForm: FormGroup = this._FormBuilder.group({
    id: [null, [Validators.required]],
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    personal_email: [null, [Validators.required]],
    phone_number: [null, [Validators.required]],
    type: [[''], [Validators.required]],
    major: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })

  AdminForm: FormGroup = this._FormBuilder.group({
    id: [null, [Validators.required]],
    name: [null, [Validators.required]],
    email: [null, [Validators.required]],
    personal_email: [null, [Validators.required]],
    phone_number: [null, [Validators.required]],
    type: [[''], [Validators.required]],
    major: [null, [Validators.required]],
    password: [null, [Validators.required]],
  })

  onFileSelected(event: Event) {
    this.errMessage = false
    this.loader = true;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this._UploadeService.uploadSheet(formData).subscribe({
        next: (res) => {
          this.loader = false
        },
        error: (err) => { this.errMessage = true ; this.loader = false }
      })
    }
  }

  submitUser() {
    if (this.stdForm.valid) {
      this._UploadeService.createSingleUser(this.stdForm.value).subscribe({
        next: (res) => {
          this.userDone = true
          setTimeout(() => { this.userDone = false }, 500)
        },
        error: (err) => {
          console.log(err);
          
          this.usererrMessage = err.error.message
        }
      })
    } else {
      this.stdForm.markAllAsTouched()
    }
  }

  submitAdmin() {
    if (this.AdminForm.valid) {
      this._UploadeService.createAdmin(this.AdminForm.value).subscribe({
        next: (res) => {
          this.adminDone = true
          setTimeout(() => { this.adminDone = false }, 500)
        },
        error: (err) => {          
          this.adminerrMessage = err.error.message
        }
      })
    } else {
      this.AdminForm.markAllAsTouched()
    }
  }
}

