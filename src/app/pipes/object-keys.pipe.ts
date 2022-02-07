import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ObjectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: any): any {
    let keys: string[] = [];
    for(let key in value){
      keys.push(key);
    }

    return keys;
  }

}
