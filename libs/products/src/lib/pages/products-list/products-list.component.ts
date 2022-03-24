import { ActivatedRoute } from '@angular/router';
import { Category } from '@mnplus/products';
import { Product } from './../../models/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject<void>();
  isCategoryPage!: boolean;


  constructor(
    private prodSrv: ProductsService,
    private catServ: CategoriesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
      params['categoryid'] ? this.isCategoryPage = true : this.isCategoryPage = false;
    })
    this._getProducts();
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProducts(categoryFilter?: string[])
  {
    this.prodSrv.getProducts(categoryFilter).pipe(takeUntil(this.endSubs$)).subscribe(resProducts => {
      this.products = resProducts;
    });
  }

  private _getCategories()
  {
    this.catServ.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(resCategories => {
      this.categories = resCategories;
    });
  }

  categoryFilter()
  {
    const selectedcategories = this.categories?.filter((category) => category.checked).map(category => category.id!);

    this._getProducts(selectedcategories);
  }

}
