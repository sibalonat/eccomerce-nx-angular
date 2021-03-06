import { Product } from './../../models/product';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '@mnplus/orders';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product!: Product;
  endSubs$: Subject<void> = new Subject<void>();
  quantity: any = 1;


  constructor(
    private prodSrv: ProductsService,
    private route: ActivatedRoute,
    private cartSrv: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProduct(id: string)
  {
    this.prodSrv.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProduct => {
      this.product = resProduct;
    })
  }

  addProductToCart()
  {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity,
    }
    this.cartSrv.setCartItem(cartItem);

  }
}


