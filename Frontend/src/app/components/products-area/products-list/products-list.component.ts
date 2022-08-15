import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
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
  public categories: string[] = [];
  public category: string = 'כל המוצרים';

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router, private notify: NotifyService) { }

  async ngOnInit() {
    try {      
      this.products = await this.productsService.getProducts();
      for (const product of this.products) {
        if (this.categories.indexOf(product.category.name) === -1) {
          this.categories.push(product.category.name);
        }        
      }

      this.productsToShow = [...this.products];

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
