import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-secundario',
  templateUrl: './botao-secundario.component.html',
  styleUrls: ['./botao-secundario.component.scss'],
})
export class BotaoSecundarioComponent {
  @Input() funcao: Function = () => {};
  @Input() titulo: string = '';
}
