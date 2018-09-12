import { Component } from '@angular/core';
import { FormGroup, ValidatorFn, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Global, User, AuthenticationService, createValidatorArr } from '../../imports';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //----------------PROPERTIRS-------------------

  loginFormGroup: FormGroup;
  isExistUser: boolean = true;

  //allow access 'Object' type via interpolation
  objectHolder: typeof Object = Object;

  //----------------CONSTRUCTOR------------------

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService) {
    this.loginFormGroup = this.formBuilder.group({
      userName: ['', createValidatorArr("userName", 3, 15, /^[A-Za-z]+$/)],
      password: ['', createValidatorArr("password", 5, 10)],

    });
  }

  //----------------METHODS-------------------

  onSubmit() {
    this.login();
  }

  login() {
    this.authenticationService.login(this.userName.value, this.password.value)
      .subscribe(user => {
        if (user != null) {
          localStorage.setItem(Global.CurrentUser, JSON.stringify(user));
          this.router.navigate(['bookStore/products']);
        }
        else
          this.isExistUser = false;
      });
  }

  //----------------GETTERS-------------------

  //getters of the form group controls

  get userName() {
    return this.loginFormGroup.controls["userName"];
  }
  get password() {
    return this.loginFormGroup.controls["password"];
  }
}
