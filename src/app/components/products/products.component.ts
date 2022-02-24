import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import {StoreService} from '../../services/store.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  today = new Date();
  date = new Date(2022,2,2024);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  myShoppingCart:Product[] = [];
  total: number = 0;

  products : Product[] = []


  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data=>{
      this.products = data;
    })
  }

  onAddToShoppingCart(product: Product){
    this.storeService.onAddToShoppingCart(product);
    this.total = this.storeService.getTotalPrice();
  }

}
