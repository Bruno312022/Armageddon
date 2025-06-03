import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost/projeto/recompensa_verde/src/backend/controllers/userController.php'; // Certifique-se de que a URL está correta

  constructor(private http: HttpClient) { }

  // Método para obter usuários
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para deletar um usuário
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  createUser(user: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, user);
}

updateUser(id: number, user: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}?id=${id}`, user);
}

 // Método para obter um usuário por ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }
}
