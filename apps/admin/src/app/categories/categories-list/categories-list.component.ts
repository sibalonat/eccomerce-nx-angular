import { Router } from '@angular/router';
import { Category } from '@mnplus/products';
import { CategoriesService } from '@mnplus/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject<void>();

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
        this.categoryService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(
          () => {
          this.msgService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is created'
          });
        },
        () => {
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
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((cats) => {
      this.categories = cats;
    });
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

}
