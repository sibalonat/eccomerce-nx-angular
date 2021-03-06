import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@mnplus/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  categories = [] as any;
  imageDisplay!: string | ArrayBuffer | null | undefined;
  currentProductId!: string;
  endSubs$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private prdSrv: ProductsService,
    private msgService: MessageService,
    private catServ: CategoriesService,
    private location: Location,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
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
      image: ['', Validators.required],
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

    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
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
    this.prdSrv.createProduct(productData).pipe(takeUntil(this.endSubs$)).subscribe(
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
    );
  }

  private _updateProduct(productData: FormData)
  {
    this.prdSrv.updateProduct(productData, this.currentProductId).pipe(takeUntil(this.endSubs$)).subscribe(
      () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Project updated succesfully`
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
    );
  }


  private _checkEditMode()
  {
    this.route.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];

        this.prdSrv.getProduct(params['id']).subscribe(product => {
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm['image'].setValidators([]);
          this.productForm['image'].updateValueAndValidity()
        });
      }
    })
  }

  private _getCategories()
  {
    this.catServ.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories;
    });
  }

  get productForm()
  {
    return this.form.controls;
  }

}
