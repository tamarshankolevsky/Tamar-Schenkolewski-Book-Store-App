import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../imports';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  product: Product;

  //----------------CONSTRUCTOR------------------

  constructor(private router: Router) { }

  //----------------METHODS-------------------

  viewDetails() {
    this.router.navigate(['/bookStore/products/productDetails', this.product.id]);
  }
  
}
