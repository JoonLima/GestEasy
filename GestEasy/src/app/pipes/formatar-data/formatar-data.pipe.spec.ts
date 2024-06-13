import * as moment from 'moment';
import { FormatarDataPipe } from './formatar-data.pipe';

describe('FormatarDataPipe', () => {
  let pipe: FormatarDataPipe;

  beforeEach(() => {
    pipe = new FormatarDataPipe();
  });

  it('Deve ter sido criada a instancia do pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Deve formatar uma data válida corretamente', () => {
    const data = new Date();
    const resultado = pipe.transform(data);
    expect(resultado).toBe(moment(data).locale('pt-br').format('DD/MM/YYYY'));
  });

  it('Deve retornar "Data inválida" para uma data null', () => {
    const resultado = pipe.transform(null);
    expect(resultado).toBe('Data inválida');
  });

  it('Deve retornar "Data inválida" para uma data undefined', () => {
    const resultado = pipe.transform(undefined);
    expect(resultado).toBe('Data inválida');
  });
});
