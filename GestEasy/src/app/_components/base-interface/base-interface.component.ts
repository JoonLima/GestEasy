import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-base-interface',
  templateUrl: './base-interface.component.html',
  styleUrls: ['./base-interface.component.scss'],
})
export class BaseInterfaceComponent {
  @Input() rotaLogin: boolean = false;

  constructor() {}
}
