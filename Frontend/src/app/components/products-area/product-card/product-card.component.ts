import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  public addProductToCartForm: FormGroup
  @Input() product: ProductModel;
  public productImage: string
  public cartId: string;


  constructor(private fb: FormBuilder, private notify: NotifyService, private cartService: CartService) { }

  ngOnInit(): void {
    if (this.product.imageName) {
      this.productImage = environment.productsImagesUrl + '/' + this.product.imageName;
    }

    this.addProductToCartForm = this.fb.group({
      productAmount: 0
    })

    this.cartService.cartWithProducts$.subscribe(cart => console.log(cart._id));
    
  }

  get productAmount() {
    return this.addProductToCartForm.get("productAmount");
  }


  public async addToCart() {
    try {
      const formValue = this.addProductToCartForm.value;
      if (formValue.productAmount > 0) {
        console.log(formValue);
        console.log(this.cartId, this.product._id);
        // this.cartService.addToCart(this.cartId, this.product._id)
      }

    } catch (err: any) {
      this.notify.error(err);

    }

  }
}
