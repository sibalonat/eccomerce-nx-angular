
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@mnplus/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


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
  imageDisplay!: string | ArrayBuffer | null;

  constructor(
    private formBuilder: FormBuilder,
    private prdSrv: ProductsService,
    private msgService: MessageService,
    private catServ: CategoriesService,
    private location: Location ) { }

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
      isFeatured: [false]
    })
  }

  onSubmit()
  {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    this._addProduct(productFormData);
  }

  // onCancel()
  // {

  // }
  onImageUpload(event: Event)
  {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    if (file) {

      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay =  fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _addProduct(productData: FormData)
  {
    this.prdSrv.createProduct(productData).subscribe(
      (product: Product) => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Project ${product.name} created succesfully`
        });
        timer(2000)
        .toPromise()
        .then(() => {
          this.location.back();
        })
      },
      () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Project failed in creation'
        })
      }
    )
  }

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
