import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../models/cart-model';
import { ProductsInCartModel } from '../models/products-in-cart-model';
import { UserModel } from '../models/user-model';
import { getAllProductsInCart } from '../state/productsInCart/productsInCart.actions';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartId: string = '';
    
    constructor(private http: HttpClient,
        private authService: AuthService,
        private store: Store
    ) { }

    public async getLatestCartByUser(userId: string): Promise<CartModel> {
        try {
            const cart = await firstValueFrom(this.http.get<CartModel>(environment.cartsUrl + `/${userId}`));
            sessionStorage.setItem('cartId', cart._id);
            return cart;

        } catch (err: any) {
            const cart = await this.createCart(userId);
            sessionStorage.setItem('cartId', cart._id);
            return cart;
        }
    }

    public async getProductsInCart(): Promise<ProductsInCartModel[]> {
        try {
            let cartId = sessionStorage.getItem('cartId');
            if (cartId === null) {
                const user = this.authService.getUserDetails();
                await this.getLatestCartByUser(user._id);
                cartId = sessionStorage.getItem('cartId');
            }
            const products = await firstValueFrom(this.http.get<ProductsInCartModel[]>(environment.productsInCartUrl + `/${cartId}`));
            return products;

        } catch (err: any) {            
            throw err;
        }
    }

    public async createCart(userId: string): Promise<CartModel> {
        try {
            const cart = await firstValueFrom(this.http.post<CartModel>(environment.cartsUrl + `/${userId}`, null));
            return cart;

        } catch (err: any) {
            throw err;
        }
    }

    public async addToCart(cartId: string, productId: string, amount: number): Promise<ProductsInCartModel> {
        try {
            const products = await this.getProductsInCart();
            const productIndex = products.findIndex(p => p.productId === productId);

            if (productIndex === -1) {
                const product = await firstValueFrom(this.http.post<ProductsInCartModel>(environment.productsInCartUrl + `/${cartId}/${productId}`, { 'amount': amount }));                
                this.cartId = sessionStorage.getItem('cartId');
                this.store.dispatch(getAllProductsInCart({ cartId: this.cartId }));
                return product;

            }
            else {
                const productInCartId = products[productIndex]._id;
                const product = products[productIndex];
                product.amount = amount;
                await firstValueFrom(this.http.put<ProductsInCartModel>(environment.productsInCartUrl + `/${productInCartId}`, products[productIndex]));
                this.cartId = sessionStorage.getItem('cartId');
                this.store.dispatch(getAllProductsInCart({ cartId: this.cartId }));

                return product;
            }

        } catch (err: any) {
            throw err;
        }
    }

    public async deleteProductFromCart(productInCartId: string) {
        try {
            await firstValueFrom(this.http.delete(environment.productsInCartUrl + `/${productInCartId}`));
        } catch (err: any) {
            throw err;
        }
    }

}
