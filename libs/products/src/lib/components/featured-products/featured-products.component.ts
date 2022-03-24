import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts!: Product[];

  constructor(
    private prodSrv: ProductsService
  ) { }

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private  _getFeaturedProducts()
  {
    this.prodSrv.getFeaturedProducts(4).subscribe(products => {
      this.featuredProducts = products;
    });
  }

}
