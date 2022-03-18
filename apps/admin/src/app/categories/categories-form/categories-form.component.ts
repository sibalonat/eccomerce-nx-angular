import { Location } from '@angular/common';
import { CategoriesService } from '@mnplus/products';
// import { CategoriesService } from './../../../../../../libs/products/src/lib/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@mnplus/products';
import { MessageService } from 'primeng/api';
// import { error } from 'console';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  // form!: FormGroup;
  form: FormGroup;

  isSubmitted = false;

  constructor(
    private msgService: MessageService,
    private formBuilder: FormBuilder,
    private catService: CategoriesService,
    private location: Location
    ) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  onSubmit()
  {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    // const category: Category = {
    //   id: this.currentCategoryId,
    //   name: this.categoryForm.name.value,
    //   icon: this.categoryForm.icon.value,
    //   color: this.categoryForm.color.value
    // };
    this.catService.createCategory(category).subscribe(
      (response) => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created'
        });
        timer(2000).toPromise().then(done => {
          this.location.back();
        })
      },
      (error) => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created'
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }
}

