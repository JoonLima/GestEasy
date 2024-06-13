import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente-model';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  obterTodos() {
    return this.httpClient.get<Cliente[]>(`${this.url}/clientes`);
  }

  obterPorId(id: number) {
    return this.httpClient.get<Cliente>(`${this.url}/clientes/${id}`);
  }

  cadastrar(cliente: Cliente) {
    return this.httpClient.post(`${this.url}/clientes`, cliente);
  }

  editar(cliente: Cliente) {
    return this.httpClient.put(`${this.url}/clientes/${cliente.id}`, cliente);
  }

  deletar(id: number) {
    return this.httpClient.delete(`${this.url}/clientes/${id}`);
  }
}
