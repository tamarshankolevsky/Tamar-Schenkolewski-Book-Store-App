import { Component } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { Product, ShoppingService, DialogConfirmComponent } from '../../imports';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent {

  //----------------PROPERTIRS-------------------

  shoppingList: { product: Product, amount: number }[];
  
  //----------------CONSTRUCTOR------------------

  constructor(private shoppingService: ShoppingService, private dialogService: DialogService) {

    this.getAllShoppingList();

    //listen to the next that is activated in the cart-product component
    //when the cart-product component remove the product, this component must refresh the shopping list
    this.shoppingService.subject.subscribe({
      next: () => this.getAllShoppingList()
    });
  }
  
  //----------------METHODS-------------------

  getAllShoppingList() {
    this.shoppingList = this.shoppingService.getAllShoppingList();
  }

  clearCart() {
    this.shoppingService.clearCart();
    this.getAllShoppingList();
  }
  showConfirm() {
    this.dialogService.addDialog(DialogConfirmComponent, {
      title: 'Clear Cart',
      message: 'Are You sure you want to clear all your cart?'
    }).subscribe((isConfirmed) => {
      //get dialog result
      if (isConfirmed) {
        this.clearCart();
      }
    });
  }
}
