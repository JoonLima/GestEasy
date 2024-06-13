import { FormatarTelefonePipe } from './formatar-telefone.pipe';

describe('FormatarTelefonePipe', () => {
  let pipe: FormatarTelefonePipe;

  beforeEach(() => {
    pipe = new FormatarTelefonePipe();
  });
  it('Deve ter sido criada a instancia do pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('Deve formatar os números de telefone corretamente.', () => {
    expect(pipe.transform('98765432122')).toBe('(98) 76543-2122');
    expect(pipe.transform('11234567892')).toBe('(11) 23456-7892');
    expect(pipe.transform('11987654321')).toBe('(11) 98765-4321');
  });

  it('Deve retornar uma string vazia caso passe undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('Deve retornar uma string vazia caso passe nenhum valor', () => {
    expect(pipe.transform('')).toBe('');
  });
});
