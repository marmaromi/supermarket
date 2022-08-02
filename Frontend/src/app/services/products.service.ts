import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public async getProductsCount(): Promise<number> {
    const productsCount = await firstValueFrom(this.http.get<number>(environment.productsUrl + '-count'));
    return productsCount;
  }
}