import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {

  public products: ProductModel[];
  public searchText: any;

  constructor(private productsService: ProductsService) { }

  async ngOnInit() {
    this.products = await this.productsService.getProducts();
  }

  search(product: ProductModel){

  }
}
