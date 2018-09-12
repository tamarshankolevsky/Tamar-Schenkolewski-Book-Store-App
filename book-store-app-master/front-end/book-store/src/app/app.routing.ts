import { Routes, RouterModule } from '@angular/router';

import {
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    HomeComponent,
    CartComponent,
    AuthGuard
} from './imports';

const appRoutes: Routes = [
    {
        path: 'bookStore/home', component: HomeComponent
    },
    {
        path: 'bookStore/myAccount', component: AccountComponent, children:
            [
                { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
                { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
            ]
    },
    {
        path: 'bookStore/products', component: ProductsComponent, children:
            [
                { path: 'allProducts', component: AllProductsComponent },
                { path: 'productDetails/:productId', component: ProductDetailsComponent,canActivate:[AuthGuard] },
                { path: '**', redirectTo: 'allProducts' }
            ]
    },
    {
        path: 'bookStore/cart', component: CartComponent, canActivate: [AuthGuard]
    },
    { path: 'bookStore', component:HomeComponent },
    // otherwise redirect to home
    { path: '**', component:HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes);