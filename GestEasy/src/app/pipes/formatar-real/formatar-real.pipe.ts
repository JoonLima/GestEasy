import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarReal',
})
export class FormatarRealPipe implements PipeTransform {
  transform(value: any) {
    if (isNaN(value) || 0) {
      return Number(0).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    return Number(value).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
