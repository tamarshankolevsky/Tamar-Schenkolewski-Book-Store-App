import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../imports';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  //----------------PROPERTIRS-------------------

  products: Product[];
  
  //----------------CONSTRUCTOR------------------

  constructor(private productService: ProductService) { }

  //----------------METHODS-------------------

  ngOnInit() {

    this.getAllProducts();

    //listen to the next that is activate in the search component
    //when the search component send a string, this component must filter the product list according to this string
    this.productService.searchSubject.subscribe(
      {
        next: (term: string) =>
          this.getAllProducts(term)
      });
  }

  getAllProducts(term?: string) {
    this.productService.getAllProducts(term).subscribe(res => {
      this.products = [];
      //add id to every product
      let index: number = 0;
      res["items"].forEach(product => {
        let currentProduct: Product = product.volumeInfo;
        currentProduct.id = ++index;
        this.products.push(currentProduct);
      });
      //send the service the product list include id
      this.productService.subject.next(this.products);
    });
  }
}

