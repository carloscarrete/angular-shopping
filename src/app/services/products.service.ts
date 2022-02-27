import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError, throwError, map, zip } from 'rxjs';
import { CreateProduct, Product, UpdateProduct } from '../models/product.model';
import {TimeInterceptor} from '../interceptors/time.interceptor'
import {checkTime} from '../interceptors/time.interceptor'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse)=>{
        if(error.status ===HttpStatusCode.Conflict){
          return throwError('Algo esta mal en el servidor');
        }if(error.status===HttpStatusCode.NotFound){
          return throwError('El producto no fue encontrado o no existe');
        }if(error.status===HttpStatusCode.Unauthorized){
          return throwError('No estas autorizado para acceder');
        }
        return throwError('Ups, algo salio mal');
      })
    )

  }



  getProductByPage(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && params){
      params = params.set('limit',limit);
      params = params.set('offset',limit);
    }
    return this.http.get<Product[]>(this.apiUrl,{params, context: checkTime()})
    .pipe(
      retry(3),
      map(products=> products.map(item => {
        return {
          ...item,
          taxes: .16 * item.price
        }
      }))
    );
  }


  fetchReadAndUpdate(id:string, data: UpdateProduct){
    //Zip permite enviar 2 observadores y recibir su respuesta al tiempo
    return zip(
      this.getProduct(id),
      this.updateProduct(id, data)
    )
    //No es necesario el subscribe  por que aqui se maneja la logica
    //En el 0 esta read y el 1 se hace el update
    //se tiene la respuesta de las 2 cosas...y asi esta en paralelo y no dependeria una de otra
  }

  createProduct(data: CreateProduct){
    return this.http.post<Product>(this.apiUrl, data);
  }

  updateProduct(id:string, data: UpdateProduct){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
