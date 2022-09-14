import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { NotifyService } from 'src/app/services/notify.service';
import { cityInList, dateValidator } from '../../auth-area/register/form-validations';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderModel } from 'src/app/models/order-model';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ModalComponent } from '../modal/modal.component';
import { CartService } from 'src/app/services/cart.service';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';


interface LooseObject {
    [key: string]: string[]
}
@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

    modalRef: MdbModalRef<ModalComponent> | null = null;
    public orderForm: FormGroup;
    public cities: string[];
    public filteredCities: Observable<string[]>;
    public today = new Date();
    public orderDetails = new OrderModel();
    public productsInCart: ProductsInCartModel[] = [];


    constructor(private fb: FormBuilder,
        private citiesService: CitiesService,
        private notify: NotifyService,
        private authService: AuthService,
        private orderService: OrdersService,
        private modalService: MdbModalService,
        private cartService: CartService,
        private router: Router
    ) { }

    async ngOnInit(): Promise<void> {
        const user = this.authService.getUserDetails();
        this.today = new Date();
        await this.getCitiesAndStreets();

        this.orderForm = this.fb.group({
            city: [user.city, [
                Validators.required,
            ]],
            street: [user.street, [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]],
            date: ['', [
                Validators.required,
            ]],
            creditCard: ['', [
                Validators.required,
                // Validators.minLength(15),
                // Validators.maxLength(16),
            ]]
        }, {
            validators: [
                cityInList('city', this.cities),
                dateValidator
            ]
        });
        // this.orderForm.valueChanges.subscribe(console.log);

        this.filteredCities = this.city.valueChanges.pipe(
            startWith(''),
            map(value => this._citiesFilter(value || '')),
        );
        this.productsInCart = await this.cartService.getProductsInCart();
    }

    private _citiesFilter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter(city => city.toLowerCase().includes(filterValue));
    }

    public async getCitiesAndStreets() {
        try {
            const streetsByCities: LooseObject = await this.citiesService.getCitiesAndStreets();
            this.cities = Object.keys(streetsByCities);

        } catch (err: any) {
            this.notify.error(err);

        }
    }

    public async order() {
        try {
            this.orderDetails.deliveryCity = this.orderForm.value.city;
            this.orderDetails.deliveryStreet = this.orderForm.value.street;
            this.orderDetails.deliveryDate = this.orderForm.value.date;
            this.orderDetails.fourLastDigits = this.orderForm.value.creditCard.slice(-4);
            this.orderDetails = await this.orderService.addOrder(this.orderDetails);
            this.notify.success('ההזמנה הושלמה בהצלחה');
            this.openModal();
        } catch (error: any) {
            console.log(error);
            this.notify.error(error);
        }
    }

    openModal() {
        this.modalRef = this.modalService.open(ModalComponent, {
            data: { productsInCart: this.productsInCart },
            backdrop: true,
            ignoreBackdropClick: true,
            keyboard: false,
            modalClass: 'modal-dialog-centered',
        });
    }

    //form values getters
    get city() { return this.orderForm.get('city'); }
    get street() { return this.orderForm.get('street'); }
    get date() { return this.orderForm.get('date'); }
    get creditCard() { return this.orderForm.get('creditCard'); }

}
