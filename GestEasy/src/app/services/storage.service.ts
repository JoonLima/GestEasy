import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private tokenKey: string = 'authToken';
  private usuario: object = {};

  constructor() {}

  salvarUsuarioNaStorage(usuario: object) {
    let usuarioStorage = JSON.stringify(usuario);
    localStorage.setItem('usuario', usuarioStorage);
  }

  obterUsuarioNaStorage() {
    let usuarioStorage = localStorage.getItem('usuario');
    if (usuarioStorage) return JSON.parse(usuarioStorage);
  }

  salvarTokenNaStorage(tokenKey: string) {
    localStorage.setItem('token', tokenKey);
  }

  obterTokenNaStorage() {
    return localStorage.getItem('token');
  }

  removerTokenNaStorage() {
    localStorage.removeItem('token');
  }

  removerUsuarioNaStorage() {
    localStorage.removeItem('usuario');
  }

  verificarSeEstaAutenticado() {
    return this.obterTokenNaStorage() !== null;
  }
}
