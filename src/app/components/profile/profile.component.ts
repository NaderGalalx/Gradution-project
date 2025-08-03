import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/interfaces/iprofile';
import { ResetPassService } from '../../core/services/reset-pass.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ProfileService = inject(ProfileService)
  private readonly _ResetPassService = inject(ResetPassService)

  // properties
  selectedFile!: File;
  userImage!: string
  profileData!: IProfile

  // change password form
  passWindowFlag: boolean = false;

  showPassFlag2: boolean = false
  showPassFlag3: boolean = false

  required: boolean = false
  successMessage: boolean = false
  errMessage: boolean = false


  // form ([formBuilder])
  resetPasswordForm: FormGroup = this._FormBuilder.group({

    newPassword: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],  // accept any language / any letter
    rePassword: [null, [Validators.required]],
    email: ['email', [Validators.required]],
    code: ['code', [Validators.required]]
  }, this.confirmPasswordCheck)

  // custome validator for repassword match
  confirmPasswordCheck(g: AbstractControl) {
    if (g.get("newPassword")?.value === g.get("rePassword")?.value) {
      return null;
    } else {
      return { misMatch: true }
    }
  }

  // Methods
  ngOnInit(): void {
    this._ProfileService.getProfile().subscribe({
      next: (res) => {
        this.profileData = res
        this.userImage = res.profile_photo_url
      },
    })
  }
  removeImage() {
    this._ProfileService.deleteProfilePhoto().subscribe({
      next: (res) => {
        console.log(res);
        window.location.reload()
      },
    })
  }
  changeImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    this._ProfileService.uploadProfilephoto(formData).subscribe({
      next: (res) => {
        return true;
      }
    })
  }

  // password ------------->

  updatePassword() {
    this.errMessage = false

    if (this.resetPasswordForm.valid) {
      this._ResetPassService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          this.successMessage = true
        },
        error: (err) => {
          this.errMessage = true
        }
      })
    } else {
      this.required = true
    }
  }
  cancelEdit() {
    this.resetPasswordForm.patchValue({
      newPassword: '',
      rePassword: ''
    })
  }


}
