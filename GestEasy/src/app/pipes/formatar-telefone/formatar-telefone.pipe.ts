import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarTelefone',
})
export class FormatarTelefonePipe implements PipeTransform {
  transform(value: any) {
    if (!value || value == undefined || value == null) {
      return '';
    }
    const campoLimpo = ('' + value).replace(/\D/g, '');

    const telefone = campoLimpo.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (telefone) {
      return `(${telefone[1]}) ${telefone[2]}-${telefone[3]}`;
    }

    // Retorna o valor original se não corresponder ao padrão esperado
    return value;
  }
}
