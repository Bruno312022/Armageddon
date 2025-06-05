import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService } from '../../../backend/Service/evento.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.page.html',
  styleUrls: ['./evento-form.page.scss'],
  standalone: false
})
export class EventoFormPage implements OnInit {
  eventoId!: number;
  evento = { 
    evnome: '',
    evdesc: '', 
    evend: '', 
    evtipo: 'corporativo', 
    evdata: '' 
  };

  constructor(
    private route: ActivatedRoute, 
    private eventoService: EventoService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.eventoId = Number(this.route.snapshot.paramMap.get('id')); // Obtendo ID da rota
    if (this.eventoId) {
      this.loadEventoData(); // Se existir um ID, carregar dados para edição
    }
  }

  loadEventoData() {
    this.eventoService.getEventoById(this.eventoId).subscribe(response => {
      this.evento = response;
    });
  }

  saveEvento() {
    if (this.eventoId) {
      // Se houver um ID, atualiza evento
      this.eventoService.updateEvento(this.eventoId, this.evento).subscribe({
        next: (response) => {
          console.log('Evento atualizado:', response);
          this.router.navigate(['/evento-list']); // Redireciona para lista
        },
        error: (error) => {
          console.error('Erro ao atualizar evento:', error);
        }
      });
    } else {
      // Se não houver ID, cria um novo evento
      this.eventoService.createEvento(this.evento).subscribe({
        next: (response) => {
          console.log('Evento criado:', response);
          this.router.navigate(['/evento-list']); // Redireciona para lista
        },
        error: (error) => {
          console.error('Erro ao criar evento:', error);
        }
      });
    }
  }

   cancelar() {
    this.router.navigate(['/evento-list']);
  }
}
