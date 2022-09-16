import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isIdValid(citizenId: number, validId: any): any {

    if (citizenId === undefined) {
        return false;
    }

    let id = citizenId.toString().trim();
    if (id.length > 9 || isNaN(citizenId)) return false;
    id = id.length < 9 ? ('00000000' + id).slice(-9) : id;
    validId = Array.from(id, Number).reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;

    if (validId) {
        return true;
    }
}

export function controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        const valueOfControlA = formGroup.get(controlNameA)?.value;
        const valueOfControlB = formGroup.get(controlNameB)?.value;

        if (valueOfControlA !== valueOfControlB) {
            return { valuesDoNotMatch: true };
        }
        return null;
    };
}

export function cityInList(selection: string, list: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        const selected: string = formGroup.get(selection)?.value;

        if (!list?.includes(selected)) {

            return { inList: true };
        }
        return null;
    };
}

export function streetInList(selection: string, list: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const formGroup = control as FormGroup;
        const selected: string = formGroup.get(selection)?.value;

        if (!list?.includes(selected)) {

            return { inList: true };
        }
        return null;
    };
}

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.get('date').value);
    const today = new Date();
    return selectedDate !== null && today !== null && selectedDate > today
        ? null : { dateValid: true };
};