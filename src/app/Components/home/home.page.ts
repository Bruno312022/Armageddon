import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  isSearchActive: boolean = false;
  searchQuery: string = '';
  
  // Propriedades do carrossel
  currentIndex: number = 0;
  translateX: number = 0;
  cards: any[] = [];

  // Arrays filtrados para busca
  filteredPalestras: any[] = [];
  filteredOficinas: any[] = [];
  filteredCampanhas: any[] = [];
  isSearching: boolean = false;

  // Propriedades das seções
  palestras: any[] = [
    { 
      id: 1, 
      nome: "Semana do Meio Ambiente", 
      descricao: "Exposição e palestras sobre sustentabilidade e inclusão", 
      imagem: "assets/pal1.jpeg", 
      link: "https://portaldoamazonas.com.br/2023/06/02/manaus-abre-semana-do-meio-ambiente-com-exposicao-e-palestras-sobre-sustentabilidade-e-inclusao/",
      categoria: "Palestra",
      data: "02/06/2023",
      badge: "Destaque",
      badgeColor: "success"
    },
    { 
      id: 2, 
      nome: "Meio Ambiente e Segurança", 
      descricao: "Parceria entre Semseg e Semmas para fiscalização ambiental", 
      imagem: "assets/pal2.jpeg", 
      link: "https://amazonasfactual.com.br/2023/09/15/prefeitura-de-manaus-e-delegacia-de-meio-ambiente-realizam-treinamento-para-combate-a-poluicao-sonora/",
      categoria: "Palestra",
      data: "15/09/2023",
      badge: "Novo",
      badgeColor: "primary"
    },
    { 
      id: 3, 
      nome: "Lixo Zero", 
      descricao: "Palestra sobre tratamento correto dos resíduos sólidos e os 5Rs", 
      imagem: "assets/pal3.jpeg", 
      link: "https://emtempo.com.br/57186/sem-categoria/palestra-encerra-programacao-da-semana-do-meio-ambiente-em-manaus/",
      categoria: "Palestra",
      data: "05/06/2023",
      badge: "Importante",
      badgeColor: "warning"
    }
  ];

  oficinas: any[] = [
    { 
      id: 1, 
      nome: "Oficinas de Reaproveitamento", 
      descricao: "Cinco oficinas gratuitas de reaproveitamento de resíduos sólidos, incluindo vela, peso de porta, aromatizador e bijuterias", 
      imagem: "assets/ofc1.jpg", 
      link: "https://www.manaus.am.gov.br/noticia/sustentabilidade/cinco-oficinas-reaproveitamento-residuos/",
      categoria: "Oficina",
      data: "10/05/2024",
      badge: "Gratuito",
      badgeColor: "success"
    },
    { 
      id: 2, 
      nome: "Arte com Reciclagem", 
      descricao: "Oficina que transforma materiais descartáveis em arte, desenvolvendo objetos decorativos com consciência ambiental", 
      imagem: "assets/ofc2.jpeg", 
      link: "https://blogdohiellevy.com.br/oficina-arte-com-reciclagem-movimenta-comunidade-do-sao-jorge/",
      categoria: "Oficina",
      data: "15/05/2024",
      badge: "Vagas limitadas",
      badgeColor: "warning"
    },
    { 
      id: 3, 
      nome: "Oficinas de Artesanato", 
      descricao: "Oficinas gratuitas de artesanato com materiais recicláveis, promovendo sustentabilidade e geração de renda", 
      imagem: "assets/ofc3.jpeg", 
      link: "https://vanguardadonorte.com.br/amazonas/seas-oferece-oficinas-de-artesanato-em-manaus/",
      categoria: "Oficina",
      data: "20/05/2024",
      badge: "Inscrições abertas",
      badgeColor: "primary"
    }
  ];

  campanhas: any[] = [
    { 
      id: 1, 
      nome: "Campanha de Artesanato Sustentável", 
      descricao: "Oficinas de artesanato com materiais recicláveis nos Centros de Convivência, promovendo sustentabilidade", 
      imagem: "assets/cam1.png", 
      link: "https://vanguardadonorte.com.br/amazonas/seas-oferece-oficinas-de-artesanato-em-manaus/",
      categoria: "Campanha",
      data: "01/06/2024",
      badge: "Em andamento",
      badgeColor: "success"
    },
    { 
      id: 2, 
      nome: "Reciclagem de Eletrodomésticos", 
      descricao: "Campanha de arrecadação de eletrodomésticos para reciclagem em Manaus, contribuindo com o meio ambiente", 
      imagem: "assets/cam2.webp", 
      link: "https://segundoasegundo.com.br/2024/05/campanha-arrecada-eletrodomesticos-para-reciclagem-em-manaus/",
      categoria: "Campanha",
      data: "10/06/2024",
      badge: "Nova",
      badgeColor: "primary"
    },
    { 
      id: 3, 
      nome: "Descarte Consciente", 
      descricao: "Iniciativa para coleta e reciclagem de equipamentos eletrônicos, evitando o descarte inadequado", 
      imagem: "assets/cam3.jpeg", 
      link: "https://segundoasegundo.com.br/2024/05/campanha-arrecada-eletrodomesticos-para-reciclagem-em-manaus/",
      categoria: "Campanha",
      data: "15/06/2024",
      badge: "Participe",
      badgeColor: "warning"
    }
  ];

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  @ViewChild('palestrasScroll') palestrasScroll!: ElementRef;
  @ViewChild('oficinasScroll') oficinasScroll!: ElementRef;
  @ViewChild('campanhasScroll') campanhasScroll!: ElementRef;

  constructor(
    private menuCtrl: MenuController,
    private router: Router
  ) {
    this.filteredPalestras = this.palestras;
    this.filteredOficinas = this.oficinas;
    this.filteredCampanhas = this.campanhas;
    
    // Embaralhar e combinar todos os eventos para o carrossel principal
    this.cards = this.shuffleArray([
      ...this.palestras,
      ...this.oficinas,
      ...this.campanhas
    ]).slice(0, 5); // Pegando apenas 5 cards para o carrossel
  }

  // Função para embaralhar array
  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  ngOnInit() {
  }

  // Método para abrir link externo
  openExternalLink(url: string) {
    window.open(url, '_blank');
  }

  // Métodos do carrossel
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarouselPosition();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updateCarouselPosition();
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarouselPosition();
  }

  private updateCarouselPosition() {
    const cardWidth = this.carouselTrack.nativeElement.offsetWidth;
    this.translateX = -this.currentIndex * cardWidth;
  }

  // Métodos de navegação das seções
  scrollSection(section: string, direction: 'prev' | 'next') {
    let element: ElementRef | null = null;
    
    switch (section) {
      case 'palestras':
        element = this.palestrasScroll;
        break;
      case 'oficinas':
        element = this.oficinasScroll;
        break;
      case 'campanhas':
        element = this.campanhasScroll;
        break;
    }

    if (element) {
      const container = element.nativeElement;
      const scrollAmount = 300;
      if (direction === 'prev') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  toggleSearch(event: Event) {
    event.stopPropagation();
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) {
      this.searchQuery = '';
      this.resetSearch();
    }
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase().trim();
    this.isSearching = query.length > 0;

    if (this.isSearching) {
      this.filteredPalestras = this.palestras.filter(item => 
        item.nome.toLowerCase().includes(query) || 
        item.descricao.toLowerCase().includes(query)
      );

      this.filteredOficinas = this.oficinas.filter(item => 
        item.nome.toLowerCase().includes(query) || 
        item.descricao.toLowerCase().includes(query)
      );

      this.filteredCampanhas = this.campanhas.filter(item => 
        item.nome.toLowerCase().includes(query) || 
        item.descricao.toLowerCase().includes(query)
      );
    } else {
      this.resetSearch();
    }
  }

  private resetSearch() {
    this.isSearching = false;
    this.filteredPalestras = this.palestras;
    this.filteredOficinas = this.oficinas;
    this.filteredCampanhas = this.campanhas;
  }

  logout() {
    // Implementar lógica de logout aqui
    this.router.navigate(['/login']);
  }
}