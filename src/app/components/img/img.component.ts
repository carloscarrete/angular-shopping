import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges,OnDestroy, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {
  /* Opcion 1...para que este checando siempre el cambio de este input */
  @Input('img')
  set changeInputImage(imageString: string){
    this.command = imageString;
    console.log('xDDD');
  }
  /* Opción 2... con un if en el método de OnChanges */

  @Input() command: string = '';
  @Output() loadedMyImg = new EventEmitter<string>();
  /* counter : number = 0;
  counterFn: number | undefined; */

  defaultImage : string = 'https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg';

  constructor() { }

  ngOnInit(): void {
    /* this.counterFn = window.setInterval(()=>{
      this.counter++;
      console.log(this.counter);
    },1000) */
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges :', this.command)
    console.log(changes, ' algo cambio');
  }

  ngOnDestroy(){
    /* window.clearInterval(this.counterFn); */
    console.log('ngOnDestroy');
  }

  errorImage(){
    this.command = this.defaultImage;
  }


  loadedImage(){
    console.log('Imagen Cargada');
    this.loadedMyImg.emit(this.command);
  }

}
