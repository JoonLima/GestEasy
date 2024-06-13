import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Usuario from 'src/app/models/usuario-model';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuAberto: boolean = false;
  @Input() nomeUsuarioLogado: string = '';
  @Input() fotoUsuarioLogado: string = '';
  usuarioLogado = new Usuario();

  constructor(
    private storageService: StorageService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  abrirMenu() {
    this.menuAberto = !this.menuAberto;
  }

  logout() {
    let token = this.storageService.obterTokenNaStorage();
    if (token) this.usuarioService.logout(token);
    this.storageService.removerTokenNaStorage();
    this.storageService.removerUsuarioNaStorage();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.usuarioLogado = this.storageService.obterUsuarioNaStorage();
  }
}
