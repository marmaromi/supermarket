import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormGroup, Validators, ValidatorFn, FormBuilder, ValidationErrors } from "@angular/forms";
import { CitiesService } from "src/app/services/cities.service";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { controlValuesAreEqual, isIdValid, cityInList } from "./form-validations";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NotifyService } from "src/app/services/notify.service";

interface LooseObject {
  [key: string]: string[]
}

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {

    public page: number = 1;
    public validId: any;
    public registerForm: FormGroup;
    public cities: string[];
    public streetsByCities: LooseObject;
    public filteredCities: Observable<string[]>;


    constructor(private fb: FormBuilder, private citiesService: CitiesService, private authService: AuthService, private router: Router, private notify: NotifyService) { }

    async ngOnInit() {
        await this.getCitiesAndStreets();

        this.registerForm = this.fb.group({
            citizenId: "",
            email: "",
            password: "",
            verifyPassword: "",
            city: "",
            street: "",
            firstName: "",
            lastName: "",
        });

        this.registerForm.valueChanges.subscribe(console.log);

        this.registerForm = this.fb.group({
            citizenId: ["", [
                Validators.required,
                Validators.pattern(/^\d{2,9}$/)
            ]],
            email: ["", [
                Validators.required,
                Validators.email
            ]],
            password: ["", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30)
            ]],
            verifyPassword: ["", [
                Validators.required,
            ]],
            city: ["", [
                Validators.required,
            ]],
            street: ["", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]],
            firstName: ["", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]],
            lastName: ["", [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(30),
            ]]
        }, {
            validators: [
                controlValuesAreEqual("password", "verifyPassword"),
                this.idValidator("citizenId"),
                cityInList("city", this.cities),
            ]
        });

        this.filteredCities = this.city.valueChanges.pipe(
            startWith(""),
            map(value => this._citiesFilter(value || "")),
        );

    }

    private _citiesFilter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.cities.filter(city => city.toLowerCase().includes(filterValue));
    }



    public movePage(n: number) {
        if (n === 1) {
            this.page = 2;
        }
        if (n === 2) {
            this.page = 1;
        }
    }


    private idValidator(id: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const formGroup = control as FormGroup;
            const citizenId: number = formGroup.get(id)?.value;

            this.validId = isIdValid(citizenId, this.validId);

            if (!this.validId) {
                return { validId: true };
            }
            return null;
        };

    }

    public async getCitiesAndStreets() {
        try {
            
            this.streetsByCities = await this.citiesService.getCitiesAndStreets();
            this.cities = Object.keys(this.streetsByCities);

        } catch (err: any) {
            this.notify.error(err);

        }
    }

    public async register() {
        try {
            const fromValue = this.registerForm.value;
            await this.authService.register(fromValue);
            this.authService.isLoggedIn();
            this.notify.success("ברוך הבא לקניה הראשונה שלך");

            this.router.navigate(["/home"]);

        } catch (err: any) {
            this.notify.error(err);


        }
    }



    get citizenId() {
        return this.registerForm.get("citizenId");
    }

    get email() {
        return this.registerForm.get("email");
    }

    get password() {
        return this.registerForm.get("password");
    }

    get verifyPassword() {
        return this.registerForm.get("verifyPassword");
    }

    get city() {
        return this.registerForm.get("city");
    }

    get street() {
        return this.registerForm.get("street");
    }

    get firstName() {
        return this.registerForm.get("firstName");
    }

    get lastName() {
        return this.registerForm.get("lastName");
    }

}
