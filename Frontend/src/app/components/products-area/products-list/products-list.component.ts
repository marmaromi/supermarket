import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category-model';
import { ProductModel } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  // public loggedIn: boolean;
  public products: ProductModel[];
  public categories: string[] = [];

  constructor(private productsService: ProductsService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    // this.authService.loginStatus$.subscribe(loginStatus => this.loggedIn = loginStatus)
    // if (!this.loggedIn) {
    //   this.router.navigateByUrl("/login");
    // }

    try {
      this.products = await this.productsService.getProducts();
      for (const product of this.products) {
        if(this.categories.indexOf(product.category.name) === -1) {
          this.categories.push(product.category.name);
      }
      }


    } catch (error: any) {
      console.log(error);

    }

  }

}
