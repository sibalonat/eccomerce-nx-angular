import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ProductsService } from '@mnplus/products';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products = [] as any;
  endSubs$: Subject<void> = new Subject<void>();

  constructor(
    private productServ: ProductsService,
    private router: Router ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  updateProduct(productId: string)
  {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts()
  {
    this.productServ.getProducts().pipe(takeUntil(this.endSubs$)).subscribe((products) => {
      this.products = products;
    });
  }

}
