import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, plugins } from 'chart.js/auto';
import { Cliente } from 'src/app/models/cliente-model';
import { Produto } from 'src/app/models/produto-model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProdutoService } from 'src/app/services/produto.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('graficoProdutosMaiorEstoque', { static: true })
  graficoProdutosMaiorEstoque?: ElementRef;
  @ViewChild('graficoProdutosComQuantidadeZerada', { static: true })
  graficoProdutosComQuantidadeZerada?: ElementRef;
  nomesMaiorEstoque: string[] = [];
  quantidadesMaiorEstoque: number[] = [];
  nomesProdutosNegativos: string[] = [];
  quantidadeProdutosNegativos: number[] = [];
  totalProdutos: number = 0;
  totalClientes: number = 0;

  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService
  ) {}

  renderizarGraficoMaioresQuantidades() {
    const configMaiorEstoque: any = {
      type: 'bar',
      responsive: true,
      data: {
        labels: this.nomesMaiorEstoque,
        datasets: [
          { data: this.quantidadesMaiorEstoque, backgroundColor: '#006969da' },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    this.produtoService.obterTodos().subscribe((res) => {
      let produtos = res;
      let produtosOrdenados = produtos
        .filter((produto) => produto.quantidadeEstoque > 0)
        .sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque)
        .slice(0, 10);

      produtosOrdenados.forEach((n) => {
        this.nomesMaiorEstoque.push(n.nome);
      });

      produtosOrdenados.forEach((n) => {
        this.quantidadesMaiorEstoque.push(n.quantidadeEstoque);
      });

      new Chart(
        this.graficoProdutosMaiorEstoque?.nativeElement,
        configMaiorEstoque
      );
    });
  }

  renderizarGraficoProdutosNegativos() {
    const configEstoqueNegativo: any = {
      type: 'line',
      responsive: true,
      data: {
        labels: this.nomesProdutosNegativos,
        datasets: [
          {
            data: this.quantidadeProdutosNegativos,
            backgroundColor: '#006969da',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    this.produtoService.obterTodos().subscribe((res) => {
      let produtos = res;
      this.totalProdutos = res.length;
      let produtosOrdenados = produtos
        .filter((produto) => produto.quantidadeEstoque <= 0)
        .sort((a, b) => b.quantidadeEstoque + a.quantidadeEstoque)
        .slice(0, 10);

      produtosOrdenados.forEach((n) => {
        this.nomesProdutosNegativos.push(n.nome);
      });

      produtosOrdenados.forEach((n) => {
        this.quantidadeProdutosNegativos.push(n.quantidadeEstoque);
      });

      new Chart(
        this.graficoProdutosComQuantidadeZerada?.nativeElement,
        configEstoqueNegativo
      );
    });
  }

  ngOnInit(): void {
    this.clienteService.obterTodos().subscribe((res) => {
      this.totalClientes = res.length;
    });
    this.renderizarGraficoProdutosNegativos();
    this.renderizarGraficoMaioresQuantidades();
  }
}
