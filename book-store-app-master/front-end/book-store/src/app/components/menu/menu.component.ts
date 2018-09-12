import { Component } from '@angular/core';
import { Global } from '../../imports';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  //----------------PROPERTIRS-------------------

  //allow access types via interpolation
  localStorage: Storage = localStorage;
  global: any = Global;
}
