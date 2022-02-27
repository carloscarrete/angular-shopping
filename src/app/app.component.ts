import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
import { UsersService } from './services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store-carrete';
  imagen = '';
  showImg = true;

  token: string = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService
  ){}


  chargeMyImage(imagen: string){
    console.log('Charged');
    console.log(imagen);
  }

  toggleButton(){
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name: 'Carlos',
      email: 'carlos@gmail.com',
      password: '123456'
    })
    .subscribe(rta=>{
      console.log(rta);
    })
  }

  downloadPDF(){
    this.fileService.getFile('my.pdf','https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf','application/pdf')
    .subscribe()
  }

}
