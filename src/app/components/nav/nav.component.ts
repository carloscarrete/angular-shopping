import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  showMenu: boolean = false;
  counter: number = 0;
 // token='';
  profile: User | null = null;

  constructor(private storeService: StoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter = products.length;
    })
  }


  toggleMenu(){
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }

/*   login(){
    this.authService.login('carlos@gmail.com','123456')
    .subscribe(rta=>{
      this.token = rta.access_token;
      console.log(this.token);
      this.getProfile();
    })
  } */

  loginAndGet(){
    this.authService.loginAdnGet('carlos@gmail.com','123456')
    .subscribe(user=>{
      this.profile = user;
    })
  }


}
