//---------------------- shared ----------------------


//models
export { User } from './shared/models/user.model';
export { Product } from './shared/models/product.model';

//services
export { AuthenticationService } from './shared/services/authentication.service';
export { ProductService } from './shared/services/product.service';
export { ShoppingService } from './shared/services/shopping.service'

//validators
export {createValidatorArr} from './shared/validators/validators';

export { AuthGuard } from './shared/auth.guard';
export { Global } from './shared/global';

//---------------------- components ----------------------

export { AppComponent } from './app.component';
//header
export { HeaderComponent } from './components/header/header.component';
export { LogoComponent } from './components/logo/logo.component';
export { MenuComponent } from './components/menu/menu.component';
//main
export { MainComponent } from './components/main/main.component';
export { HomeComponent } from './components/home/home.component';
export { AccountComponent } from './components/account/account.component';
export { AccountMenuComponent } from './components/account-menu/account-menu.component';
export { LoginComponent } from './components/login/login.component';
export { RegisterComponent } from './components/register/register.component';
export { UploadImageComponent } from './components/upload-image/upload-image.component';
export { ProductsComponent } from './components/products/products.component';
export { AllProductsComponent } from './components/all-products/all-products.component';
export { SearchComponent } from './components/search/search.component';
export { ProductPreviewComponent } from './components/product-preview/product-preview.component';
export { ProductDetailsComponent } from './components/product-details/product-details.component';
export { CartComponent } from './components/cart/cart.component';
export { CartProductComponent } from './components/cart-product/cart-product.component';
export { DialogConfirmComponent  } from './components/dialog-confirm/dialog-confirm.component';
export { TickComponent } from './components/tick/tick.component';
//footer
export { FooterComponent } from './components/footer/footer.component';


