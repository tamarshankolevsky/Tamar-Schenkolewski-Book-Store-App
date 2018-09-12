import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Global } from '../imports';
import { ProductService } from './services/product.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    //----------------CONSTRUCTOR------------------

    constructor(private router: Router, private productService: ProductService) { }
    
    //----------------METHODS-------------------

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.url.length >= 2 && route.url[1].path == 'cart') {
            if (localStorage.getItem(Global.CurrentUser)) {
                // logged in so return true
                return true;
            }

            // not logged in so redirect to home page
            this.router.navigate(['/bookStore/home']);
            return false;
        }
        else if (route.url[0].path == 'productDetails') {
            if (isNaN(+route.url[1].path) || +route.url[1].path >= this.productService.products.length) {
                //there isn't product with such id so rediret to home page
                this.router.navigate(['/bookStore/home'])
                return false;
            }
            else
                return true
        }
        //in case the routing is to login or register
        else {
            if (!localStorage.getItem(Global.CurrentUser)) {
                // not logged in so return true
                return true;
            }
            // logged in so return false
            return false;
        }

    }
}