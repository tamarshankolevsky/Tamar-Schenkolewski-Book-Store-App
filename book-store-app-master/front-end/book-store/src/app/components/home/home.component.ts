import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //----------------PROPERTIRS-------------------

  address: { city: string, street: string, houseNumber: number };

  //----------------CONSTRUCTOR------------------

  constructor() {
    this.address = { city: "Tel-aviv", street: "Hamasger", houseNumber: 12 };
  }
  
}
