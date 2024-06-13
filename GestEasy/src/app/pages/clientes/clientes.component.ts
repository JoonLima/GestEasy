import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente-model';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  titulo: string = 'Adicionar';
  clientes$ = new Observable<Cliente[]>();

  constructor(private clienteService: ClienteService, private router: Router) {
    this.obterClientes();
  }

  obterClientes() {
    this.clientes$ = this.clienteService.obterTodos();
  }

  novoCliente() {
    this.router.navigate(['/clientes/novo']);
  }

  excluirCliente(nome: string, id?: number) {
    Swal.fire({
      title: 'Confirma a exclusão o cliente?',
      text: `${id} - ${nome}`,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      confirmButtonColor: '#004F4F',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          this.clienteService.deletar(id).subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Cliente excluido!',
              showConfirmButton: false,
              timer: 1500,
            });
            this.obterClientes();
          });
        }
      }
    });
  }
}
