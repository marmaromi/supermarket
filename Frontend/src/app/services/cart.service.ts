import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartCollapseStatusSource = new Subject<string>();
  cartCollapseStatus$ = this._cartCollapseStatusSource.asObservable();

  constructor() { }


  public changeCartCollapse(collapsed: boolean): void {
    if (collapsed) {
      this._cartCollapseStatusSource.next("col-sm-12 col-md-8 col-lg-9")
    }
    else {
      this._cartCollapseStatusSource.next("col-sm-12");
    }

  }


}
