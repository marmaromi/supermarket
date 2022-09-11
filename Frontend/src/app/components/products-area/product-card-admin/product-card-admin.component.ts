import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card-admin',
    templateUrl: './product-card-admin.component.html',
    styleUrls: ['./product-card-admin.component.css']
})
export class ProductCardAdminComponent implements OnInit {

    @Input() product: ProductModel;
    public productImage: string;

    constructor(private notify: NotifyService) { }

    ngOnInit(): void {
        if (this.product.imageName) {
            this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;
        }
    }

    editProduct(){
        console.log(this.product.productName);
        
        
    }

}
