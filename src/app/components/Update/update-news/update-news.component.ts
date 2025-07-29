import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { INews } from '../../../core/interfaces/inews';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';

@Component({
  selector: 'app-update-news',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-news.component.html',
  styleUrl: './update-news.component.css'
})
export class UpdateNewsComponent implements OnInit {
  // DI ----------------->
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _Router = inject(Router)
  private readonly _NewsService = inject(NewsService)

  // properties ------------------->
  selectedImage!: File;
  loaderflag: boolean = false
  errMessage: boolean = false
  newIndex!: string | null
  newsData!: INews




  // form ([formBuilder])
  newsForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required]],
    desc: [null, [Validators.required]],
  })


  // Methods
  ngOnInit(): void {
    // get ID from the URL ------------------------------>

    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => { this.newIndex = res.get("new_id") }
    });

    // get API ------------------------------------>
    this._NewsService.getNew(this.newIndex).subscribe({
      next: (res) => {
        this.newsData = res

        // reload the data --------------->
        this.newsForm.patchValue({
          name: this.newsData.title,
          desc: this.newsData.content
        })
        this.selectedImage = this.newsData.image
      }
    })


  }

  cancelEvent() {
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

      this.loaderflag = true

      const formData = new FormData();
      formData.append('title', this.newsForm.value.name);
      formData.append('description', this.newsForm.value.desc);
      formData.append('start_time', this.newsForm.value.date);
      formData.append('image', this.selectedImage || new File([], ''));
      
      this._NewsService.updateNew(this.newIndex, formData).subscribe({
        next: (res) => {
          this.loaderflag = false
          this._Router.navigate(['/main/news'])
        },
        error: (err) => {
          this.loaderflag = false
          this.errMessage = true
        }
      })


    }

  }

}
