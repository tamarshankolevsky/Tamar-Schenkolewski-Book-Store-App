import { Component, Input } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { Product, ShoppingService, DialogConfirmComponent } from '../../imports';


@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css', '../product-preview/product-preview.component.css']
})
export class CartProductComponent {

  //----------------PROPERTIRS-------------------

  @Input()
  product: { product: Product, amount: number };

  //----------------CONSTRUCTOR------------------

  constructor(private shoppingService: ShoppingService, private dialogService: DialogService) { }

  //----------------METHODS-------------------

  /**
 *  @method
 * remove book from the user's cart
 */
  removeBook() {
    this.shoppingService.removeBookFromShoppingList(this.product.product.id);
    this.shoppingService.subject.next();
  }

  /**
   * @method
   * increase the amount of the prouducts in the cart
   */
  incAmount() {
    this.product.amount++;
    this.shoppingService.updateAmount(this.product)
  }

  /**
     * @method
   * decrease the amount of the prouducts in the cart
   */
  decAmount() {
    if (this.product.amount > 1)
      this.product.amount--;
    this.shoppingService.updateAmount(this.product)
  }

  /** 
   * @method
  * confirm the user of remove book from his cart
  */
  showConfirm() {
    this.dialogService.addDialog(DialogConfirmComponent, {
      title: 'Remove Book',
      message: 'Are You sure you want to romove this book?'
    }).subscribe((isConfirmed) => {
      //get dialog result
      if (isConfirmed) {
        this.removeBook();
      }
    });
  }

}
