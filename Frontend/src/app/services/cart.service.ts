import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CartModel } from "../models/cart-model";
import { ProductsInCartModel } from "../models/products-in-cart-model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private userId: string;

    // private _productsInCartSource = new Subject<ProductsInCartModel>();
    // public productsInCart$ = this._productsInCartSource.asObservable();

    constructor(private http: HttpClient, private authService: AuthService) { }

    public async getLatestCartByUser(userId: string): Promise<CartModel> {
        try {
            const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartsUrl + `/${userId}`));
            sessionStorage.setItem("cartId", cart._id);
            return cart;

        } catch (err: any) {
            throw err;
        }

    }

    public async getProductsInCart(userId: string): Promise<ProductsInCartModel[]> {
        try {
            const cartId = (await this.getLatestCartByUser(userId))._id;
            const products = await firstValueFrom(this.http.get<ProductsInCartModel[]>(environment.productsInCartUrl + `/${cartId}`));
            // this._productsInCartSource.next(cart);
            return products;



        } catch (err: any) {
            throw err;
        }
    }

    public async addToCart(cartId: string, productId: string, amount: number) {
        try {
            this.authService.userDetails$.subscribe(user => this.userId = user._id);
            const products = await this.getProductsInCart(this.userId);
            const productIndex = products.findIndex(p => p.productId === productId);

            if (productIndex === -1) {
                const res = await firstValueFrom(this.http.post(environment.productsInCartUrl + `/${cartId}/${productId}`, amount));
            }
            else {
                const productInCartId = products[productIndex]._id;
                const res = await firstValueFrom(this.http.put(environment.productsInCartUrl + `/${productInCartId}`, amount));

            }




        } catch (err: any) {
            throw err;
        }
    }



}
