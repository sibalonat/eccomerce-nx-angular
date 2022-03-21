import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProductsService } from '@mnplus/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [] as any;

  constructor(
    private productServ: ProductsService,
    private router: Router ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  updateProduct(productId: string)
  {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProducts()
  {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
