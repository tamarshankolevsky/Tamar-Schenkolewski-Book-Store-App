import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product, Global } from '../../imports';

@Injectable()
export class ShoppingService {

    //----------------PROPERTIRS-------------------

    subject = new Subject();

    //----------------METHODS-------------------

    /**
       * @method
       * get key of shopping list of the current user in the localStorage
       */
    getKey() {
        let userId: number = JSON.parse(localStorage.getItem(Global.CurrentUser)).id;
        let key: string = `userId${userId}:${Global.ShoppingList}`;
        if (localStorage.getItem(key) == null)
            localStorage.setItem(key, '[]');
        return key;
    }
    getAllShoppingList() {
        let key: string = this.getKey();
        let shoppingList = JSON.parse(localStorage.getItem(key));
        return shoppingList;
    }
    addBookToShoppingList(productToAdd: Product) {
        let shoppingList = this.getAllShoppingList();
        let productIndex: number = shoppingList.findIndex(product => product.product.title == productToAdd.title);
        //if this product founded in shopping list, just increase the amount
        if (productIndex != -1)
            shoppingList[productIndex].amount++;
        else
            shoppingList.push({ product: productToAdd, amount: 1 });
        this.updateShoppingList(shoppingList);
    }

    removeBookFromShoppingList(productId: number) {
        let shoppingList = this.getAllShoppingList();
        let index = shoppingList.findIndex(product => product.product.id == productId);
        shoppingList.splice(index, 1);
        this.updateShoppingList(shoppingList);
    }
    /**
     * @method
     * clear all user's cart
     */
    clearCart() {
        this.updateShoppingList([]);
    }
    /**
     * @method
     *   update the amount of a certain book
     * @param productToUpdate -the amount books to update
     */
    updateAmount(productToUpdate) {
        let shoppingList = this.getAllShoppingList();
        let index = shoppingList.findIndex(product => product.product.title == productToUpdate.product.title);
        shoppingList[index] = productToUpdate;
        this.updateShoppingList(shoppingList);

    }

    updateShoppingList(shoppingList) {
        let key: string = this.getKey();
        localStorage.setItem(key, JSON.stringify(shoppingList));

    }


}