import { MascaraCnpjCpfPipe } from './mascara-cnpj-cpf.pipe';

describe('MascaraCnpjCpfPipe', () => {
  let pipe: MascaraCnpjCpfPipe;

  beforeEach(() => {
    pipe = new MascaraCnpjCpfPipe();
  });
  it('Deve ter sido criada a instancia do pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Deve formatar os CPFs corretamente', () => {
    expect(pipe.transform('12345678909')).toBe('123.456.789-09');
    expect(pipe.transform('123.456.789-09')).toBe('123.456.789-09');
    expect(pipe.transform('12345678900')).toBe('123.456.789-00');
  });

  it('Deve formatar os CNPJs corretamente', () => {
    expect(pipe.transform('12345678000195')).toBe('12.345.678/0001-95');
    expect(pipe.transform('12.345.678/0001-95')).toBe('12.345.678/0001-95');
    expect(pipe.transform('12345678910111')).toBe('12.345.678/9101-11');
  });

  it('Deve retornar vazio caso for passada um valor undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('Deve retornar uma string vazia caso seja passada uma string vazia', () => {
    expect(pipe.transform('')).toBe('');
  });
});
