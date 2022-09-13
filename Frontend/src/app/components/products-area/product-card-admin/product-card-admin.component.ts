import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card-admin',
    templateUrl: './product-card-admin.component.html',
    styleUrls: ['./product-card-admin.component.css']
})
export class ProductCardAdminComponent implements OnInit {

    @Input() product: ProductModel;
    public productImage: string;

    constructor(private notify: NotifyService, private productsService: ProductsService) { }

    ngOnInit(): void {
        if (this.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;
        }
    }

    editProduct() {
        this.productsService.getOneProduct(this.product._id);
    }

}
