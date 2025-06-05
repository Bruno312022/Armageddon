import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Início', url: '/home', icon: 'home' },
    { title: 'Pontos', url: '/folder/outbox', icon: 'leaf' }, //ciar pagina de troca de pontos
    { title: 'Certificados', url: '/score', icon: 'ribbon' }
  ];

  public adminPages = [
    { title: 'Usuários', url: '/user-list', icon: 'people' },
    { title: 'Eventos', url: '/evento-list', icon: 'calendar' }
  ];

  isAdminOpen: boolean = false;

  constructor(private router: Router) {}

  toggleAdminMenu() {
    this.isAdminOpen = !this.isAdminOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}