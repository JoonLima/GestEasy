import { Component, Input, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto-model';
import { ProdutoService } from 'src/app/services/produto.service';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  @Input() tituloBotaoAdicionar: string = 'Adicionar';
  produtos$ = new Observable<Produto[]>();
  produtos: Produto[] = [];
  nomeUsuario: string = '';

  constructor(
    private produtoService: ProdutoService,
    private storageService: StorageService
  ) {
    this.obterProdutos();
  }

  obterProdutos() {
    this.produtoService.obterTodos().subscribe((produtosAPI) => {
      this.produtos = produtosAPI;
    });
  }

  excluirProduto(nome: string, id?: number) {
    Swal.fire({
      title: 'Confirma a exclusão o produto?',
      text: `${id} - ${nome}`,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      confirmButtonColor: '#004F4F',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          this.produtoService.deletar(id).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Produto excluido!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.obterProdutos();
          });
        }
      }
    });
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  formatarData(data: any) {
    return moment(data).locale('pt-br').format('DD/MM/YYYY');
  }

  gerarPDF() {
    const docDefinition: any = {
      content: [
        {
          columns: [
            {
              text: `Data: ${this.formatarData(Date())}`,
              width: 430,
              fontSize: 10,
            },
            {
              text: `Usuário: ${this.nomeUsuario}`,
              width: 'auto',
              fontSize: 10,
            },
          ],
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 0,
              x2: 530,
              y2: 0,
              lineWidth: 2,
              lineColor: '#ccc',
            },
          ],
          margin: [0, 5, 0, 10], // Margem inferior para afastar a linha do cabeçalho da tabela
        },
        { text: 'Lista de Produtos', style: 'header' },

        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 2,
            widths: ['*', 'auto', 'auto', '*', '*'],
            body: [
              [
                { text: 'Nome', bold: true },
                { text: 'Estoque', bold: true },
                { text: 'Valor', bold: true },
                { text: 'Data cadastro', bold: true },
                { text: 'Observação', bold: true },
              ],
              ...this.produtos.map((produto) => [
                produto.nome,
                produto.quantidadeEstoque,
                this.formatarPreco(produto.valor),
                this.formatarData(produto.dataCadastro),
                produto.observacao,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        columns: {
          fontSize: 15,
          heigth: '50px',
          fillColor: 'black',
          color: '#fff',
        },
      },
      pageMargins: [25, 20, 40, 60],
    };

    pdfMake.createPdf(docDefinition).open();
  }

  ngOnInit(): void {
    let usuario = this.storageService.obterUsuarioNaStorage();
    this.nomeUsuario = usuario.nome;
  }
}
