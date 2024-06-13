import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StorageService } from './services/storage.service';
import Usuario from './models/usuario-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'GestEasy';
  menuVisivel: boolean = true;
  rotaLogin: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.menuVisivel = event.url !== '/login';
        this.rotaLogin = event.url == '/login';
      }
    });
  }
}
