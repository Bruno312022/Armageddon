import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../backend/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  standalone: false
})
export class UserListPage implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  // Método para carregar usuários
  loadUsers() {
  this.userService.getUsers().subscribe({
    next: (response) => {
      console.log('Dados recebidos:', response); // 👀 Verifique se os dados aparecem no console
      this.users = response;
    },
    error: (error) => {
      console.error('Erro ao buscar usuários:', error);
    }
  });
}

  // Método para deletar um usuário
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(response => {
      console.log('Usuário deletado:', response);
      this.loadUsers(); // Atualizar lista após exclusão
    });
  }

   goToUserForm(userId?: number) {
  if (userId) {
    this.router.navigate(['/user-form', userId]); // Redireciona para edição
  } else {
    this.router.navigate(['/user-form']); // Redireciona para criação
  }
}

}
