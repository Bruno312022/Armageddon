import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: false
})
export class ScorePage implements OnInit {
  score: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadScore(); // Carrega os pontos ao iniciar
  }

  loadScore() {
    const savedScore = localStorage.getItem('userScore');
    this.score = savedScore ? parseInt(savedScore, 10) : 0;
  }

  saveScore() {
    localStorage.setItem('userScore', this.score.toString());
  }

  uploadFile(event: any) {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.score += 100;
      this.saveScore(); // Salva os pontos após incrementar
      alert('PDF enviado com sucesso! Você ganhou 50 pontos.');
    } else {
      alert('Por favor, selecione um arquivo PDF.');
    }
  }

  selectFile() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}

}
