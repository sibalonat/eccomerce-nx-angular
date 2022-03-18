import { Router } from '@angular/router';
import { Category } from '@mnplus/products';
import { CategoriesService } from '@mnplus/products';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private categoryService: CategoriesService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getCategories();
  }

  deleteCategory(categoryId: string)
  {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(response => {
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is created'
          });
        },
        (error) => {
          this.msgService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not created'
          });
        });
      }
    });
  }

  updateCategory(categoryId: string) {
    // this.categoryService.
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  private _getCategories()
  {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

}
