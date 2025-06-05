import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../backend/Service/user.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.page.html',
  styleUrls: ['./user-form.page.scss'],
  standalone: false
})
export class UserFormPage implements OnInit {
  userId!: number;
  user = { nome: '', email: '', telefone: '', senha: '', tipo: 'usuario' };

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService, 
    private router: Router,
    private menuCtrl: MenuController  
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id')); // Obtendo ID da rota
    if (this.userId) {
      this.loadUserData(); // Se existir um ID, carregar dados para edição
    }
  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe(response => {
      this.user = response;
    });
  }

  saveUser() {
    if (this.userId) {
      // Se houver um ID, atualiza usuário
      this.userService.updateUser(this.userId, this.user).subscribe({
        next: (response) => {
          console.log('Usuário atualizado:', response);
          this.router.navigate(['/user-list']); // Redireciona para lista
        },
        error: (error) => {
          console.error('Erro ao atualizar usuário:', error);
        }
      });
    } else {
      // Se não houver ID, cria um novo usuário
      this.userService.createUser(this.user).subscribe({
        next: (response) => {
          console.log('Usuário criado:', response);
          this.router.navigate(['/user-list']); // Redireciona para lista
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }
      });
    }
  }

    async toggleMenu() {
    await this.menuCtrl.toggle();
  }

  cancelar() {
    this.router.navigate(['/user-list']);
  }
}
