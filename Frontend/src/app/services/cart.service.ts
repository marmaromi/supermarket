import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { CartModel } from "../models/cart-model";
import { ProductsInCartModel } from "../models/products-in-cart-model";
import { UserModel } from "../models/user-model";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class CartService {
    private user: UserModel;

    private _productsInCartSource = new Subject<ProductsInCartModel[]>();
    public productsInCart$ = this._productsInCartSource.asObservable();

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

    public async getProductsInCart(): Promise<ProductsInCartModel[]> {
        try {
            const userId = this.authService.getUserDetails()._id;
            const cartId = (await this.getLatestCartByUser(userId))._id;
            const products = await firstValueFrom(this.http.get<ProductsInCartModel[]>(environment.productsInCartUrl + `/${cartId}`));
            this._productsInCartSource.next(products);
            return products;



        } catch (err: any) {
            throw err;
        }
    }

    public async addToCart(cartId: string, productId: string, amount: number): Promise<ProductsInCartModel> {
        try {
            const products = await this.getProductsInCart();
            const productIndex = products.findIndex(p => p.productId === productId);
            
            if (productIndex === -1) {                
                const product = await firstValueFrom(this.http.post<ProductsInCartModel>(environment.productsInCartUrl + `/${cartId}/${productId}`, {"amount": amount}));
                // this.store.dispatch(addProductToCart({product: product}));
                return product;

            }
            else {
                const productInCartId = products[productIndex]._id;
                const product = products[productIndex];
                product.amount = amount;
                await firstValueFrom(this.http.put<ProductsInCartModel>(environment.productsInCartUrl + `/${productInCartId}`, products[productIndex]));
                // this.store.dispatch(updateProductInCart({product: product}));
                return product;
            }

        } catch (err: any) {
            throw err;
        }
    }

    public async deleteProductFromCart(productInCartId: string) {
        try {
            const res = await firstValueFrom(this.http.delete(environment.productsInCartUrl + `/${productInCartId}`));

        } catch (err: any) {
            throw err;
        }
    }



}
