import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Auth} from '../../app/models/auth.modelo'
import {User} from '../../app/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email,password})
  }

  profile(token: string){
    //Otra opcion,..... en este caso se deja abajo del return lapalabra headers
    //const headers = new HttpHeaders;
    //headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`,{
      headers:{
        Authorization: `Bearer ${token}`,
        //'Content-type': 'application/json'
      }
    })
  }
}
