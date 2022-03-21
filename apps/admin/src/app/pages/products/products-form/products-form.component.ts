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
  imageDisplay!: string | ArrayBuffer | null;

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
  onImageUpload(event: Event)
  {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    // console.log(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay =  fileReader.result
      }
      fileReader.readAsDataURL(file);
    }

    // console.log((event.target as HTMLInputElement).files);
    // console.log((event.target as HTMLInputElement).files[0]);

    // const file = event.target;
    // const file = (event.target as HTMLInputElement).files;
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
