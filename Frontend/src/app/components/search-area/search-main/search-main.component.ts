import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';
import { getAllProducts, getProductsBySearch } from 'src/app/state/products/products.actions';

@Component({
    selector: 'app-search-main',
    templateUrl: './search-main.component.html',
    styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {

    public products: ProductModel[];
    public searchText: any;
    public v: string = '';

    constructor(private productsService: ProductsService, private store: Store) { }

    async ngOnInit() {
        this.products = await this.productsService.getProducts();
    }

    search(){
        this.store.dispatch(getProductsBySearch({ productName: this.searchText }));
    }
}
