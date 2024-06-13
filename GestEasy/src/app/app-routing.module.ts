import { ProdutoComponent } from './pages/produto/produto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { LoginComponent } from './pages/login/login.component';
import { guardAuthGuard } from './guard/guard-auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [guardAuthGuard] },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [guardAuthGuard],
  },
  {
    path: 'clientes/novo',
    component: ClienteComponent,
    canActivate: [guardAuthGuard],
  },
  {
    path: 'clientes/editar/:id',
    component: ClienteComponent,
    canActivate: [guardAuthGuard],
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    canActivate: [guardAuthGuard],
  },
  {
    path: 'produtos/novo',
    component: ProdutoComponent,
    canActivate: [guardAuthGuard],
  },
  {
    path: 'produtos/editar/:id',
    component: ProdutoComponent,
    canActivate: [guardAuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
