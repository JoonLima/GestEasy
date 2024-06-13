import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { MenuComponent } from './_components/menu/menu.component';
import { BaseInterfaceComponent } from './_components/base-interface/base-interface.component';
import { CardComponent } from './_components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BotaoAlterarTemaComponent } from './_components/botao-alterar-tema/botao-alterar-tema.component';
import { BotaoPrimarioComponent } from './_components/botao-primario/botao-primario.component';
import { BotaoSecundarioComponent } from './_components/botao-secundario/botao-secundario.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './intercept/auth-intercept';
import { ProdutoComponent } from './pages/produto/produto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormatarDataPipe } from './pipes/formatar-data/formatar-data.pipe';
import { MascaraCnpjCpfPipe } from './pipes/mascara-cnpj-cpf/mascara-cnpj-cpf.pipe';
import { FormatarTelefonePipe } from './pipes/formatar-telefone/formatar-telefone.pipe';
import { FormatarRealPipe } from './pipes/formatar-real/formatar-real.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    DashboardComponent,
    ProdutosComponent,
    MenuComponent,
    BaseInterfaceComponent,
    CardComponent,
    BotaoAlterarTemaComponent,
    BotaoPrimarioComponent,
    BotaoSecundarioComponent,
    ProdutoComponent,
    ClienteComponent,
    LoginComponent,
    FormatarDataPipe,
    MascaraCnpjCpfPipe,
    FormatarTelefonePipe,
    FormatarRealPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
