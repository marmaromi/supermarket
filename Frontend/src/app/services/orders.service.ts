import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public async getOrdersCount(): Promise<number> {
    const ordersCount = await firstValueFrom(this.http.get<number>(environment.ordersUrl + '-count'));
    return ordersCount;
  }
}
