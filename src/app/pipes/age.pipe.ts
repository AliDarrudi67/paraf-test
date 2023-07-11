import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'calcAge'
})
export class CalcAgePipe implements PipeTransform {
  transform(value: number) {
    const currentYear=new Date().getFullYear()
    return currentYear - value;
  };

}

