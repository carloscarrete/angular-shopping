import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  myShoppingCart:Product[] = [];
  private myCart= new BehaviorSubject<Product[]>([]);

  myCart$ = this.myCart.asObservable();

  constructor() { }

  onAddToShoppingCart(product: Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotalPrice(){
    return this.myShoppingCart.reduce((sum, item)=> sum + item.price,0);
  }

  getMyShoppingCart(){
    return this.myShoppingCart;
  }
}
