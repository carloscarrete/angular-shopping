import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vowels'
})
export class VowelsPipe implements PipeTransform {

  transform(value: string): string {

    let vowelsChanged: string = '';
    vowelsChanged = value.replace(/[aeiou]/ig, (m)=>{
      if(m==='a'){return '4'}
        else if(m==='e'){return '3'}
        else if(m==='i'){return 'L'}
        else if(m==='o'){return '0'}
      else { return 'U'}
    });
    return vowelsChanged;
  }

}
