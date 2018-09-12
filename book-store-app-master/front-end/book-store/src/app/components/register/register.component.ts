import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User, AuthenticationService, Global, createValidatorArr } from '../../imports';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})

export class RegisterComponent {

  //----------------PROPERTIRS-------------------

  registerFormGroup: FormGroup;
  //allow access from html page to 'Object' type
  objectHolder: typeof Object = Object;
  isExistUserName: boolean = false;
  isExistPassword: boolean = false;
  imageFile: any;

  //----------------CONSTRUCTOR------------------

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.registerFormGroup = this.formBuilder.group({
      firstName: ['', createValidatorArr("firstName", 2, 15, /^[A-Za-z]+$/)],
      lastName: ['', createValidatorArr("lastName", 2, 15, /^[A-Za-z]+$/)],
      userName: ['', createValidatorArr("userName", 3, 15, /^[A-Za-z]+$/)],
      password: ['', createValidatorArr("password", 5, 10)],
    });
  }

  //----------------METHODS-------------------

  onSubmit() {
    let user: User = this.registerFormGroup.value;
    //upload profile image in the server
    this.authenticationService.upload(this.imageFile).subscribe(res => {
      //placement image name to the user object
      user.profileImageUrl = res.newFilename;
      this.register(user);
    });
  }

  register(user: User) {
    this.isExistUserName = false;
    this.isExistPassword = false;
    this.authenticationService.register(user).subscribe(
      res => {
        let userId: number = res.userId;
        switch (userId) {
          case -1:
            this.isExistUserName = true;
            break;
          case -2:
            this.isExistPassword = true;
            break;
          default:
            user.id = userId;
            //enter current user into localStorage
            localStorage.setItem(Global.CurrentUser, JSON.stringify(user));
            this.router.navigate(['bookStore/products']);
            break;
        }
      },
      err => console.log(err));
  }
  /**
   * @method
   * get image from event emitter of 'upload-image' component 
   * when user choose his profile image
   */
  getImage(value: any) {
    this.imageFile = value;
  }

  //----------------GETTERS-------------------

  //getters of the form group controls

  get firstName() {
    return this.registerFormGroup.controls["firstName"];
  }
  get lastName() {
    return this.registerFormGroup.controls["lastName"];
  }
  get userName() {
    return this.registerFormGroup.controls["userName"];
  }
  get password() {
    return this.registerFormGroup.controls["password"];
  }
}
