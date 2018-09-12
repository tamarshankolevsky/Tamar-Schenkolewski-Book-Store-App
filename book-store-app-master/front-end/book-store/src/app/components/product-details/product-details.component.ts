import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ShoppingService, Product, Global } from '../../imports';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  product: Product;
  localStorage:Storage = localStorage;
  global:any= Global;
  showAnimation: boolean = false;

  //----------------CONSTRUCTOR------------------

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService, private shoppingService: ShoppingService) { }
  
  //----------------METHODS-------------------

  ngOnInit() {
    let productId: number;
    this.activatedRoute.params.subscribe(params => productId = params['productId']);
    this.product = this.productService.getProductById(productId);
  }

  AddToCart() {
    this.shoppingService.addBookToShoppingList(this.product);
    this.showAnimation = true;
    setTimeout(() => {
      this.showAnimation = false;
    }, 2500);
  }
  
  preview() {
    this.router.navigate(['/bookStore/products/allProducts']);
  }
}
