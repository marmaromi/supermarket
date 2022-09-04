import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

interface LooseObject {
  [key: string]: string[]
}


@Injectable({
    providedIn: 'root'
})


export class CitiesService {

    public cities: any[];
    public streets: any[];

    constructor(private http: HttpClient) { }


    // public async getCities(): Promise<string[]> {
    //   const allCities = await firstValueFrom(this.http.get<any>(environment.citiesUrl));
    //   let cityList: string[] = allCities.result.records.map((a: { שם_ישוב: any; }) => a.שם_ישוב);
    //   cityList = cityList.map(e => e.trim());
    //   return cityList;
    // }


    public async getCitiesAndStreets(): Promise<LooseObject> {
        const allStreets = await firstValueFrom(this.http.get<any>(environment.streetsUrl));
        let cityList: LooseObject = {};

        allStreets.result.records.forEach((result: any) => {

            try {
                cityList[result['שם_ישוב'].trim()].push(result['שם_רחוב'].trim());
            }
            catch {
                cityList[result['שם_ישוב'].trim()] = [result['שם_רחוב'].trim()];
            }

        });

        return cityList;
    }



}
