import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getAllProducts(){
    return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products');
  }
}
