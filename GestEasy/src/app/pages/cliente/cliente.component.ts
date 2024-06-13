import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente-model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  @Input() modoEdicao: boolean = false;
  @Input() tituloBotaoPrimario: string = 'Salvar';
  @Input() tituloBotaoSecundario: string = 'Cancelar';
  id?: number = undefined;
  cliente: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.cliente = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      cpfOuCnpj: new FormControl('', [Validators.required]),
      telefone: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  obterClientePorId() {
    if (this.id) {
      this.clienteService.obterPorId(this.id).subscribe((res) => {
        this.cliente.patchValue(res);
      });
    }
  }

  salvar() {
    if (this.id) {
      this.editarCliente();
    } else {
      this.cadastrarCliente();
    }
  }

  cadastrarCliente() {
    if (!this.cliente.valid) {
      return;
    } else {
      const cliente: Cliente = this.cliente.value;
      if (cliente.dataCadastro == null) {
        cliente.dataCadastro = new Date();
      }
      this.clienteService.cadastrar(cliente).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente cadastrado!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/clientes']);
      });
    }
  }

  editarCliente() {
    if (!this.cliente.valid) {
      return;
    } else {
      const cliente: Cliente = this.cliente.value;
      this.clienteService.editar(cliente).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente alterado!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/clientes']);
      });
    }
  }

  get nome() {
    return this.cliente.get('nome')!;
  }

  get cpfOuCnpj() {
    return this.cliente.get('cpfOuCnpj')!;
  }

  get email() {
    return this.cliente.get('email')!;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
    });
    this.id ? (this.modoEdicao = true) : false;

    this.obterClientePorId();
  }
}
