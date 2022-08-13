import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart-model';
import { ProductsInCartModel } from '../models/products-in-cart-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartWithProductsSource = new Subject<ProductsInCartModel>();
  public cartWithProducts$ = this._cartWithProductsSource.asObservable();

  constructor(private http: HttpClient) { }

  public async getLatestCartByUser(userId: string): Promise<CartModel> {
    try {
      const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartsUrl + `/${userId}`));      
      return cart;

    } catch (err: any) {
      throw err;
    }

  }

  public async getCartWithProducts(userId: string): Promise<void> {
    try {
      console.log(userId);      
      const cartId = (await this.getLatestCartByUser(userId))._id;
      console.log(cartId);
      const cart = await firstValueFrom(this.http.get<ProductsInCartModel>(environment.productsInCartUrl + `/${cartId}`));
      console.log(333);
      
      this._cartWithProductsSource.next(cart);
      console.log(444);
      

    } catch (err: any) {
      throw err;
    }
  }

  public async addToCart(productId: string, cartId: string) {
    try {
      const res = await firstValueFrom(this.http.post(environment.cartsUrl + `/${cartId}/${productId}`, null));
      

    } catch (err: any) {
      throw err;
    }
  }



}
