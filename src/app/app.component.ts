import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-store-carrete';
  imagen = '';
  showImg = true;


  chargeMyImage(imagen: string){
    console.log('Charged');
    console.log(imagen);
  }

  toggleButton(){
    this.showImg = !this.showImg;
  }
}
