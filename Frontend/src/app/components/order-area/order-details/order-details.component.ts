import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import { NotifyService } from 'src/app/services/notify.service';
import { cityInList, dateValidator } from '../../auth-area/register/form-validations';
import { AuthService } from 'src/app/services/auth.service';

interface LooseObject {
    [key: string]: string[]
}
@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

    public orderForm: FormGroup;
    public cities: string[];
    public filteredCities: Observable<string[]>;
    public today = new Date();

    constructor(private fb: FormBuilder, private citiesService: CitiesService, private notify: NotifyService, private authService: AuthService) { }

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

    public order() {
        console.log(this.orderForm.value);
    }

    //form values getters
    get city() { return this.orderForm.get('city'); }
    get street() { return this.orderForm.get('street'); }
    get date() { return this.orderForm.get('date'); }
    get creditCard() { return this.orderForm.get('creditCard'); }

}
