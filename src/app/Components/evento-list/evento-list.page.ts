import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../backend/Service/evento.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.page.html',
  styleUrls: ['./evento-list.page.scss'],
  standalone: false
})
export class EventoListPage implements OnInit {
  eventos: any[] = [];

  constructor(
    private eventoService: EventoService, 
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadEventos();
  }

  // Método para carregar eventos
  loadEventos() {
    this.eventoService.getEventos().subscribe({
      next: (response) => {
        console.log('Dados recebidos:', response); // 👀 Verifique se os dados aparecem no console
        this.eventos = response;
      },
      error: (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    });
  }

  // Método para deletar um evento
  deleteEvento(id: number) {
    this.eventoService.deleteEvento(id).subscribe({
      next: () => {
        console.log('Evento deletado com sucesso');
        this.loadEventos(); // Atualizar lista após exclusão
      },
      error: (error) => {
        console.error('Erro ao deletar evento:', error);
      }
    });
  }

  // Método para redirecionar para a página de formulário de evento
  goToEventoForm(eventoId?: number) {
    if (eventoId) {
      this.router.navigate(['/evento-form', eventoId]); // Redireciona para edição
    } else {
      this.router.navigate(['/evento-form']); // Redireciona para criação
    }
  }

  async toggleMenu() {
    await this.menuCtrl.toggle();
  }
}