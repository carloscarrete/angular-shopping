import { Component, OnInit } from '@angular/core';
import {  zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateProduct, Product, UpdateProduct } from 'src/app/models/product.model';
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
  showProductDetail: boolean = false;
  limit: number = 10;
  offset: number = 0;
  statusDetail: 'loading' | 'sucess' | 'error' | 'init' = 'init';

  productChoosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: '',
    },
  }

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
    this.productsService.getProductByPage(10,0)
    .subscribe(data=>{
      this.products = data;
      this.offset+=this.limit;
    })
  }

  onAddToShoppingCart(product: Product){
    this.storeService.onAddToShoppingCart(product);
    this.total = this.storeService.getTotalPrice();
  }


  toggleProductDetail(){
  this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data=>{
      this.productChoosen = data;
      this.statusDetail = 'sucess';
    }, errorMsg =>{   //Tambien se puede llamar response
      alert(errorMsg);
      this.statusDetail = 'error';
    })
  }

  createNewProduct(){
    const product: CreateProduct ={
      title: 'Nuevo Producto',
      description: 'Película del año',
      images: [''],
      price: 1580,
      categoryId: 2
    }
    this.productsService.createProduct(product)
    .subscribe(data=>{
      this.products.unshift(data);
    })
  }

  updateMyProduct(){
    const changes: UpdateProduct = {
      title: 'Hola Mundo'
    }
    const id = this.productChoosen.id;
    this.productsService.updateProduct(id, changes)
    .subscribe(data=>{
      const productIndex = this.products.findIndex(item=>item.id===this.productChoosen.id);
      this.products[productIndex]=data;
    })
  }


  //Se puede copiar varias instrucciones de tipo switch map concatenando la respuesta de uno
  //para dar el valor de otro... evita call hell...Siempre cuando se tengan dependencias (un dato anterior y pss
  //assi)
  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product)=>{
        return this.productsService.updateProduct(product.id,{title: 'buenas'});
      })
    )
    .subscribe(data=>{
      console.log(data);
    })

    //Zip permite enviar 2 observadores y recibir su respuesta al tiempo
  /*   zip(
      this.productsService.getProduct(id),
      this.productsService.updateProduct(id, {title: 'Nuevo'})
    ) */
    this.productsService.fetchReadAndUpdate(id, {title:'yep'})
    //En el 0 esta read y el 1 se hace el update
    //se tiene la respuesta de las 2 cosas...y asi esta en paralelo y no dependeria una de otra
    .subscribe(response =>{
      const read = response[0];
      const update = response[1];
    })

  }

  deleteProduct(){
    const id = this.productChoosen.id;
    this.productsService.deleteProduct(id)
    .subscribe(()=>{
      const productIndex = this.products.findIndex(item=>item.id===this.productChoosen.id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    })
  }

  loadMore(){
    this.productsService.getProductByPage(this.limit,this.offset)
    .subscribe(data=>{
      this.products = this.products.concat(data);
      this.offset+=this.limit;
    })
  }

}
