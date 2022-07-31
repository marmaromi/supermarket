import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public stock = 100;
  public orders = 50;

  constructor() { }

  ngOnInit(): void {
  }

}
