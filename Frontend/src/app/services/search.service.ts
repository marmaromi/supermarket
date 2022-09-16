/* eslint-disable indent */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchValue$: string = '';
  searchValueSource: BehaviorSubject<string>;

  constructor() {
    this.searchValueSource = new BehaviorSubject(this.searchValue$);

  }

  searchUpdate(newValue: string) {
    this.searchValueSource.next(newValue);
  }

}
