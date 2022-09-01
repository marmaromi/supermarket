import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    public products: ProductModel[];
    public productsToShow: ProductModel[];
    public productsInCart: ProductsInCartModel[];
    public categories: string[] = [];
    public category: string = 'כל המוצרים';
    public userRole: string;


    constructor(private productsService: ProductsService, private authService: AuthService, private router: Router, private notify: NotifyService, private cartService: CartService) { }

    async ngOnInit() {
        try {      
            this.productsInCart = await this.cartService.getProductsInCart(); //??????????????
            
            this.products = await this.productsService.getProducts();
            for (const product of this.products) {
                if (this.categories.indexOf(product.category.name) === -1) {
                    this.categories.push(product.category.name);
                }        
            }

            this.productsToShow = [...this.products];
            this.userRole = (this.authService.getUserDetails()).role;


        } catch (error: any) {
            this.notify.error(error);

        }

    }

    showCategory(category: string){
        this.category = category;
        this.productsToShow.length = 0;
        this.productsToShow = this.products.filter(p=> p.category.name === category);    
    }

}
