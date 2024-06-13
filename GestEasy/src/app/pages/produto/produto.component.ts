import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/models/produto-model';
import { ProdutoService } from 'src/app/services/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
})
export class ProdutoComponent implements OnInit {
  @Input() modoEdicao: boolean = false;
  @Input() tituloBotaoPrimario: string = 'Salvar';
  @Input() tituloBotaoSecundario: string = 'Cancelar';
  id?: number = undefined;
  produto: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.produto = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      quantidadeEstoque: new FormControl(''),
      valor: new FormControl('', [Validators.required]),
      observacao: new FormControl(''),
    });
  }

  obterProdutoPorId() {
    if (this.id) {
      this.produtoService.obterPorId(this.id).subscribe((res) => {
        this.produto.patchValue(res);
      });
    }
  }

  salvar() {
    if (this.id) {
      this.editarProduto();
    } else {
      this.cadastrarProduto();
    }
  }

  cadastrarProduto() {
    if (!this.produto.valid) {
      return;
    } else {
      const produto: Produto = this.produto.value;
      if (produto.dataCadastro == null) {
        produto.dataCadastro = new Date();
      }
      this.produtoService.cadastrar(produto).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Produto cadastrado!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/produtos']);
      });
    }
  }

  editarProduto() {
    if (!this.produto.valid) {
      return;
    } else {
      const produto: Produto = this.produto.value;
      this.produtoService.editar(produto).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Produto alterado!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/produtos']);
      });
    }
  }

  get nome() {
    return this.produto.get('nome')!;
  }

  get valor() {
    return this.produto.get('valor')!;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.id ? (this.modoEdicao = true) : false;
    this.obterProdutoPorId();
  }
}
