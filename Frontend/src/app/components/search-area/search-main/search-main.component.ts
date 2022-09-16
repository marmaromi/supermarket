import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductModel } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';
import { SearchService } from 'src/app/services/search.service';
import { getAllProducts, getProductsBySearch } from 'src/app/state/products/products.actions';

@Component({
    selector: 'app-search-main',
    templateUrl: './search-main.component.html',
    styleUrls: ['./search-main.component.css']
})
export class SearchMainComponent implements OnInit {

    public products: ProductModel[];
    public searchValue: string;
    public url = this.router.url;
    public letterSearch: string = '';

    constructor(
        private productsService: ProductsService,
        private store: Store,
        private searchService: SearchService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.products = await this.productsService.getProducts();
    }

    search() {
        this.store.dispatch(getProductsBySearch({ productName: this.searchValue }));
    }

    onKeydownEvent(event: any) {
        if (event.key === 'Backspace') {
            this.letterSearch = this.letterSearch.slice(0, -1);
        }
        if (event.key.match(/^[a-zA-Zא-ת0-9]$/)) {
            this.letterSearch += event.key;            
        }
        this.searchService.searchUpdate(this.letterSearch);
    }
}
