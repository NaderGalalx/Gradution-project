import { NewsService } from './../../core/services/news.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creat-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './creat-new.component.html',
  styleUrl: './creat-new.component.css'
})
export class CreatNewComponent {
  // DI ----------------->
  constructor(private _NewsService: NewsService) { }
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  // properties ------------------->
  selectedImage!: File;
  loaderflag: boolean = false
  errMessage: boolean = false

  // form ([formBuilder])
  newsForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    desc: [null, [Validators.required]],
  })


  // Methods

  cancelNew() {
    this._Router.navigate(["/main/news"])
  }
  onImageSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

  onSubmit() {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched()
    }
    else {
      const formData = new FormData();
      formData.append('title', this.newsForm.value.name);
      formData.append('content', this.newsForm.value.desc);
      formData.append('image', this.selectedImage || new File([], ''));

      this._NewsService.creatNews(formData).subscribe({
        next: (res) => {
          this.loaderflag = false
          this._Router.navigate(['/main/news'])
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
