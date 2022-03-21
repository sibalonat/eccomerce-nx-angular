import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@mnplus/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  categories = [] as any;

  constructor(
    private formBuilder: FormBuilder,
    private catServ: CategoriesService ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm()
  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: ['']
    })
  }

  // onSubmit()
  // {

  // }
  // onCancel()
  // {

  // }

  private _getCategories()
  {
    this.catServ.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get productForm()
  {
    return this.form.controls;
  }

}
