import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente-model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private url = environment.api;

  constructor(private httpClient: HttpClient) {}

  login(email: string, senha: string) {
    return this.httpClient.post<String>(`${this.url}/login`, {
      email,
      senha,
    });
  }

  logout(token?: string) {
    return this.httpClient.post<String>(`${this.url}/logout`, token);
  }
}
