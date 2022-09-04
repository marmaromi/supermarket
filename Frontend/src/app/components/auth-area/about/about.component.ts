import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    public stock: number;
    public orders: number;

    constructor(private productsService: ProductsService, private ordersService: OrdersService) { }

    async ngOnInit(): Promise<void> {
        this.stock = await this.productsService.getProductsCount();
        this.orders = await this.ordersService.getOrdersCount();
    
    }

}
