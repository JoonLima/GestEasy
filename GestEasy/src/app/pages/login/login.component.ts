import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import Usuario from 'src/app/models/usuario-model';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailUsuario: string = '';
  senhaUsuario: string = '';
  loading: boolean = false;

  momentForm!: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login() {
    if (this.email.invalid || this.senha.invalid) {
      return;
    } else {
      this.loading = true;
      setTimeout(() => {
        this.usuarioService
          .login(this.emailUsuario, this.senhaUsuario)
          .subscribe(
            (res) => {
              let dadoRes = JSON.stringify(res);
              let dadoObj = JSON.parse(dadoRes);
              this.storageService.salvarTokenNaStorage(dadoObj.token);
              this.storageService.salvarUsuarioNaStorage(dadoObj.usuario);
              this.router.navigate(['/']);
              this.loading = false;
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: `${err.error.mensagem}`,
                showConfirmButton: true,
                confirmButtonColor: '#004F4F',
              });
              this.loading = false;
            }
          );
      }, 1500);
    }
  }

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.momentForm.get('email')!;
  }

  get senha() {
    return this.momentForm.get('senha')!;
  }
}
