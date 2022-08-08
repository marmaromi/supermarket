import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product-model';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  addProductToCartForm: FormGroup

  @Input() product: ProductModel;

  constructor(private fb: FormBuilder, private notify: NotifyService) { }

  ngOnInit(): void {

    this.addProductToCartForm = this.fb.group({
      productAmount: 0
    })

  }

  get productAmount() {
    return this.addProductToCartForm.get("productAmount");
  }


  public async addToCart() {
    try {
      const formValue = this.addProductToCartForm.value;
      if (formValue.productAmount > 0) {
        console.log(formValue);

      }

    } catch (err: any) {
      this.notify.error(err);

    }

  }
}
