/* eslint-disable indent */
import { Component, Input, OnInit } from "@angular/core";
import { ProductsInCartModel } from "src/app/models/products-in-cart-model";
import { UserModel } from "src/app/models/user-model";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart-customer",
  templateUrl: "./cart-customer.component.html",
  styleUrls: ["./cart-customer.component.css"]
})
export class CartCustomerComponent implements OnInit {

  @Input() cartId: string;

  // public user: UserModel;
  public productsInCart: ProductsInCartModel[] = [];

  constructor(private authService: AuthService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    // this.user = this.authService.getUserDetails();
    this.productsInCart = await this.cartService.getProductsInCart();
    // console.log(this.productsInCart);
    

  }

}
