export class Cliente {
  id?: number;
  nome: string = '';
  cpfOuCnpj: string = '';
  email: string = '';
  telefone: string = '';
  idUsuario?: number;
  dataCadastro?: Date = new Date();
}
