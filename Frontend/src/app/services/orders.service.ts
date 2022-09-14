import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order-model';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private cartService: CartService,
    ) { }

    public async getOrdersCount(): Promise<number> {
        const ordersCount = await firstValueFrom(this.http.get<number>(environment.ordersUrl + '-count'));
        return ordersCount;
    }

    public async addOrder(orderDetails: OrderModel): Promise<OrderModel> {
        try {
            const order = new OrderModel();
            order.userId = this.authService.getUserDetails()._id;
            order.cartId = sessionStorage.getItem('cartId');
            const cart = this.cartService.getProductsInCart();
            order.finalPrice = (await cart).reduce((acc, curr) => acc + curr.totalProductPrice, 0);
            order.deliveryCity = orderDetails.deliveryCity;
            order.deliveryStreet = orderDetails.deliveryStreet;
            order.deliveryDate = orderDetails.deliveryDate;
            order.orderDate = new Date().toLocaleDateString();
            order.fourLastDigits = orderDetails.fourLastDigits;
            const addedOrder = await firstValueFrom(this.http.post<OrderModel>(environment.ordersUrl, order));
            await firstValueFrom(this.http.delete<OrderModel>(environment.cartsUrl + `/close/${order.cartId}`));
            sessionStorage.removeItem('cartId');
            this.cartService.createCart(order.userId);
            return addedOrder;
        }
        catch (error: any) {
            throw error;
        }
    }
}
