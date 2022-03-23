import { Location } from '@angular/common';
import { CategoriesService } from '@mnplus/products';
// import { CategoriesService } from './../../../../../../libs/products/src/lib/services/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@mnplus/products';
import { MessageService } from 'primeng/api';
// import { error } from 'console';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  // form!: FormGroup;
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  endsubs$: Subject<void> = new Subject<void>();
  currentCategoryId!: string;

  constructor(
    private msgService: MessageService,
    private formBuilder: FormBuilder,
    private catService: CategoriesService,
    private location: Location,
    private router: ActivatedRoute
    ) { }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit()
  {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value
    }
    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }

  }

  private _addCategory(category: Category)
  {
    this.catService.createCategory(category).subscribe(
      (category: Category) => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category is created'
        });
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
      () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created'
        });
      }
    );
  }
  private _updateCategory(category: Category)
  {
    this.catService.updateCategory(category).subscribe(
      () => {
        this.msgService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Category ${category.name} is created`
        });
        timer(2000).toPromise().then(() => {
          this.location.back();
        })
      },
      () => {
        this.msgService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Category is not created'
        });
      }
    );
  }

  private _checkEditMode()
  {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];

        this.catService.getCategory(params['id']).subscribe(category => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        });
      }
    })
  }

  get categoryForm() {
    return this.form.controls;
  }
}

