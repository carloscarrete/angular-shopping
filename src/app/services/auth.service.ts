import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import {Auth} from '../../app/models/auth.modelo'
import {User} from '../../app/models/user.model'
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';
  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email,password})
    .pipe(
      tap(response=>this.tokenService.saveToken(response.access_token))
    )
  }

  loginAdnGet(email: string, password: string){
    return this.login(email,password)
    .pipe(
      switchMap(()=>this.profile())
    )
  }

 /*  profile(token: string){ */
    //Otra opcion,..... en este caso se deja abajo del return lapalabra headers
    //const headers = new HttpHeaders;
    //headers.set('Authorization', `Bearer ${token}`);
/*     return this.http.get<User>(`${this.apiUrl}/profile`,{
      headers:{ */
/*         Authorization: `Bearer ${token}`,
 */        //'Content-type': 'application/json'
/*       }
    })
  } */

  profile(){
    //Otra opcion,..... en este caso se deja abajo del return lapalabra headers
    //const headers = new HttpHeaders;
    //headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`,{
  /*     headers:{
        Authorization: `Bearer ${token}`, */
        //'Content-type': 'application/json'
      /* } */
    })
  }
}
