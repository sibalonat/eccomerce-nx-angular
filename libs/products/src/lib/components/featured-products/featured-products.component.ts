import { Product } from './../../models/product';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  featuredProducts!: Product[];
  endSubs$: Subject<void> = new Subject<void>();
  constructor(
    private prodSrv: ProductsService
  ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private  _getFeaturedProducts()
  {
    this.prodSrv.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.featuredProducts = products;
    });
  }

}
