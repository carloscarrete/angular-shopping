import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User, CreateUser } from '../../app/models/user.model'
import { CreateProduct } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/users';
  constructor(private http: HttpClient) { }

  create(user: CreateUser){
    return this.http.post<User>(this.apiUrl,user);
  }

  getAll(){
    return this.http.get<User>(this.apiUrl);
  }


}
