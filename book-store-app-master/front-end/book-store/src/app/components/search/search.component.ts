import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../imports';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  //----------------PROPERTIRS-------------------

  seachControl: FormControl = new FormControl();

  //----------------CONSTRUCTOR------------------

  constructor(private productService: ProductService) { }

  //----------------METHODS-------------------

  /**
   * @method
   * 'all-product' component will filter the product list according to this string
   */
  onKeyUp() {
    this.productService.searchSubject.next(this.seachControl.value);
  }

}
