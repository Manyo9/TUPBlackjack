import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MesaComponent } from './juego/mesa/mesa.component';
import { NoEncontradoComponent } from './no-encontrado/no-encontrado.component';

const routes: Routes = [
  {path: 'mesa', component: MesaComponent},
  {path: 'inicio', component: InicioComponent},
  {path:'', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', component: NoEncontradoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
