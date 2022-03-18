import { Category } from '@mnplus/products';
import { CategoriesService } from '@mnplus/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

}
