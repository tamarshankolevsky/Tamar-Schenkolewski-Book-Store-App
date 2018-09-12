import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, Global } from '../../imports';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})

export class AccountMenuComponent {

  //----------------PROPERTIRS-------------------

  //allow access types via interpolation
  localStorage: Storage = localStorage;
  global: any = Global;

  //----------------CONSTRUCTOR------------------

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  //----------------METHODS-------------------

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/bookStore/home']);

  }

}
