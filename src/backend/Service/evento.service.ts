import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = 'http://localhost/projeto/recompensa_verde/src/backend/controllers/eventoController.php'; // Certifique-se de que a URL está correta

  constructor(private http: HttpClient) { }

  // Método para obter eventos
  getEventos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para obter um evento por ID
  getEventoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  // Método para criar um evento
  createEvento(evento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evento);
  }

  // Método para atualizar um evento
  updateEvento(id: number, evento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, evento);
  }

  // Método para deletar um evento
  deleteEvento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}
