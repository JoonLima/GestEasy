export class Produto {
  id?: number;
  nome: string = '';
  valor: number = 0;
  quantidadeEstoque: number = 0;
  observacao: string = '';
  dataCadastro?: Date = new Date();
}
