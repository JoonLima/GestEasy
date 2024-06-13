import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-botao-alterar-tema',
  templateUrl: './botao-alterar-tema.component.html',
  styleUrls: ['./botao-alterar-tema.component.scss'],
})
export class BotaoAlterarTemaComponent {
  darkTheme: boolean = false;

  alterarTema() {
    if (document.body.classList.contains('dark-theme')) {
      this.darkTheme = false;
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      document.querySelector('table.table')?.classList.remove('table-dark');
      document.querySelector('table.table')?.classList.add('table-light-2');
    } else {
      this.darkTheme = true;
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      document.querySelector('table.table')?.classList.add('table-dark');
    }

    Chart.defaults.backgroundColor = '#9BD0F5';
    Chart.defaults.borderColor = '#36A2EB';
    Chart.defaults.color = '#000';
  }
}
