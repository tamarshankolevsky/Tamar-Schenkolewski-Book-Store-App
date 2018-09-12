import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {
  //components
  AppComponent,
  //header
  HeaderComponent,
  LogoComponent,
  MenuComponent,
  //main
  MainComponent,
  HomeComponent,
  AccountComponent,
  AccountMenuComponent,
  LoginComponent,
  RegisterComponent,
  UploadImageComponent,
  ProductsComponent,
  SearchComponent,
  AllProductsComponent,
  ProductPreviewComponent,
  ProductDetailsComponent,
  CartComponent,
  CartProductComponent,
  //footer
  FooterComponent,
  //shared-components
  DialogConfirmComponent,
  TickComponent,
  //services
  AuthenticationService,
  ProductService,
  ShoppingService,
} from './imports';

@NgModule({
  declarations: [
    //components
    AppComponent,
    //header
    HeaderComponent,
    LogoComponent,
    MenuComponent,
    //main
    MainComponent,
    HomeComponent,
    AccountComponent,
    AccountMenuComponent,
    LoginComponent,
    RegisterComponent,
    UploadImageComponent,
    ProductsComponent,
    AllProductsComponent,
    SearchComponent,
    ProductPreviewComponent,
    ProductDetailsComponent,
    CartComponent,
    CartProductComponent,
    //footer
    FooterComponent,
    //shared-components
    DialogConfirmComponent,
    TickComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    BootstrapModalModule.forRoot({ container: document.body }),
    NgbModule
  ],
  entryComponents: [
    DialogConfirmComponent
  ],
  providers: [
    AuthenticationService,
    ProductService,
    ShoppingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
