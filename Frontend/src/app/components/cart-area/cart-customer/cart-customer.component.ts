/* eslint-disable indent */
import { Component, Input, OnInit } from '@angular/core';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-cart-customer',
  templateUrl: './cart-customer.component.html',
  styleUrls: ['./cart-customer.component.css']
})
export class CartCustomerComponent implements OnInit {

  @Input() cartId: string;

  // public user: UserModel;
  public productsInCart: ProductsInCartModel[] = [];

  constructor(private authService: AuthService, private cartService: CartService, private notify: NotifyService ) { }

  async ngOnInit(): Promise<void> {
    // this.user = this.authService.getUserDetails();
    try {
      this.productsInCart = await this.cartService.getProductsInCart();
    } catch (err: any) {
      this.notify.error(err);
    }
    // console.log(this.productsInCart);


  }

}
