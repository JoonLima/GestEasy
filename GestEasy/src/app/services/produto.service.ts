import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto-model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterTodos() {
    return this.httpClient.get<Produto[]>(`${this.url}/produtos`);
  }

  obterPorId(id: number) {
    return this.httpClient.get<Produto>(`${this.url}/produtos/${id}`);
  }

  cadastrar(produto: Produto) {
    return this.httpClient.post(`${this.url}/produtos`, produto);
  }

  editar(produto: Produto) {
    return this.httpClient.put(`${this.url}/produtos/${produto.id}`, produto);
  }

  deletar(id: number) {
    return this.httpClient.delete(`${this.url}/produtos/${id}`);
  }
}
