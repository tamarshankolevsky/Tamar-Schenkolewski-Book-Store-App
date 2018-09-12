import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})

export class AccountComponent implements OnInit {

  //----------------CONSTRUCTOR------------------

  constructor(private router: Router) { }

  //----------------METHODS-------------------

  ngOnInit() {
    this.router.navigate(['/bookStore/myAccount/login']);
  }


}
