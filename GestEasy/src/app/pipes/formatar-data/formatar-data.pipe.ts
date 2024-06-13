import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatarData',
})
export class FormatarDataPipe implements PipeTransform {
  transform(data: any) {
    if (data) {
      return moment(data, 'YYYY-MM-DD').format('DD/MM/YYYY');
    } else {
      return 'Data inválida';
    }
  }
}
