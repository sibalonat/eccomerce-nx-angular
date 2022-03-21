import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';import { ProductsService } from '@mnplus/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products = [] as any;



  constructor( private productServ: ProductsService ) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts()
  {
    this.productServ.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
