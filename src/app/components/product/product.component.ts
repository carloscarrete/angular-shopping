import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }
  @Input() product: Product = {
    id: '',
    title: '',
    price: 0,
    image: '',
    description: '',
    category: '',
  }

  @Output() addedProduct = new EventEmitter<Product>();

  ngOnInit(): void {
  }

  addToCart(){
    this.addedProduct.emit(this.product)
  }

}
