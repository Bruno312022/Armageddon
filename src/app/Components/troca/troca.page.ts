import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-troca',
  templateUrl: './troca.page.html',
  styleUrls: ['./troca.page.scss'],
  standalone: false
})
export class TrocaPage implements OnInit {
  isSearchActive: boolean = false;
  searchQuery: string = '';
  estabelecimentos: any[] = [
    {
      id: 1,
      nome: 'Supermercado Queiroz',
      imagem: 'assets/sup1.jpg',
      descricao: 'Supermercado parceiro com produtos sustentáveis e orgânicos',
      endereco: 'Av. Djalma Batista, 482 - Chapada, Manaus - AM',
      produtos: [
        { nome: 'Cesta Básica', pontos: 1000, icon: 'basket-outline' },
        { nome: 'Kit Limpeza Eco', pontos: 500, icon: 'leaf-outline' },
        { nome: 'Vale Compras R$50', pontos: 800, icon: 'gift-outline' }
      ]
    },
    {
      id: 2,
      nome: 'Super Nova Cidade',
      imagem: 'assets/sup2.png',
      descricao: 'Produtos frescos e sustentáveis para sua família',
      endereco: 'Av. Noel Nutels, 1762 - Cidade Nova, Manaus - AM',
      produtos: [
        { nome: 'Cesta Orgânicos', pontos: 1200, icon: 'basket-outline' },
        { nome: 'Kit Horta', pontos: 300, icon: 'leaf-outline' },
        { nome: 'Vale Compras R$100', pontos: 1500, icon: 'gift-outline' }
      ]
    },
    {
      id: 3,
      nome: 'Supermercado Nova Era',
      imagem: 'assets/sup3.jpeg',
      descricao: 'Qualidade e sustentabilidade em um só lugar',
      endereco: 'Av. Grande Circular, 1500 - São José Operário, Manaus - AM',
      produtos: [
        { nome: 'Kit Produtos Naturais', pontos: 700, icon: 'basket-outline' },
        { nome: 'Cesta Frutas', pontos: 400, icon: 'leaf-outline' },
        { nome: 'Vale Compras R$30', pontos: 500, icon: 'gift-outline' }
      ]
    }
  ];
  filteredEstabelecimentos: any[] = [];

  @ViewChild('estabelecimentosScroll') estabelecimentosScroll!: ElementRef;

  constructor(
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.filteredEstabelecimentos = this.estabelecimentos;
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  toggleSearch(event: Event) {
    event.stopPropagation();
    this.isSearchActive = !this.isSearchActive;
    if (!this.isSearchActive) {
      this.searchQuery = '';
      this.onSearch();
    }
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredEstabelecimentos = this.estabelecimentos;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredEstabelecimentos = this.estabelecimentos.filter(estabelecimento => 
        estabelecimento.nome.toLowerCase().includes(query) ||
        estabelecimento.descricao.toLowerCase().includes(query) ||
        estabelecimento.produtos.some((produto: any) => 
          produto.nome.toLowerCase().includes(query)
        )
      );
    }
  }

  scrollSection(section: string, direction: 'prev' | 'next') {
    const element = this.estabelecimentosScroll.nativeElement;
    const cardWidth = 320; // Largura do card + gap
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}