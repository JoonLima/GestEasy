import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-botao-primario',
  templateUrl: './botao-primario.component.html',
  styleUrls: ['./botao-primario.component.scss'],
})
export class BotaoPrimarioComponent {
  @Input() funcao: Function = () => {};
  @Input() titulo: string = '';
}
