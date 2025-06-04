import { Component } from '@angular/core';
import { UserService } from '../../../backend/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(private userService: UserService, private router: Router) {}

 login() {
  console.log('Enviando:', this.email, this.senha); // Verifica no console se os dados estão corretos

  this.userService.loginUser(this.email, this.senha).subscribe(
    response => {
      console.log('Resposta do servidor:', response); // Verifica o retorno do backend
      if (response.success) {
        localStorage.setItem('userToken', response.token);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      } else {
        alert('Email ou senha inválidos.');
      }
    },
    error => {
      console.error('Erro no login:', error);
      alert('Erro ao tentar fazer login.');
    }
  );
}


}
