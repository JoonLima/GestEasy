import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() funcaoEditar: Function = () => {};
  @Input() funcaoExcluir: Function = () => {};
  @Input() idItem?: any = 5;
  @Input() urlDestino: string = '';

  constructor() {}

  abrirModal() {
    const modal = document.querySelector('dialog');
    modal?.showModal();
  }

  fecharModal() {
    const modal = document.querySelector('dialog');
    modal?.close();
  }
}
